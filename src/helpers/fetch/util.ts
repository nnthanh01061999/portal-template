import { getLocale } from "next-intl/server"
import qs from "qs"

import { RequestPropertyInit } from "@/helpers/fetch/config"
import { getLogout } from "@/stores/stores/auth"
import { getHeaders } from "@/stores/stores/user-agent"

import {
  CreateRequestProps,
  ResponseData,
  ResponseType,
  SubscriberItemType
} from "./fetch-type"

export const convertResponse = async (
  response: Response,
  responseType: ResponseType
): Promise<any> => {
  switch (responseType) {
    case "json":
      return await response.json()
    case "text":
      return await response.text()
    case "blob":
      return await response.blob()
    default:
      return response
  }
}

export const injectVariablesToPath = (
  url: string,
  variables: Record<string, any>
): string => {
  let newUrl = url
  Object.entries(variables).forEach(([key, value]) => {
    newUrl = newUrl.replace(new RegExp(`:${key}`, "g"), value)
  })

  return newUrl
}

export const createRequest = (props: CreateRequestProps) => {
  const {
    refreshToken,
    getToken,
    onRetryFailed = () => undefined,
    shouldRefreshToken = () => false,
    minTokenRefreshDuration = 200
  } = props

  let isTokenRefreshing = false
  let refreshSubscribers: Array<SubscriberItemType> = []
  let lastRefreshTime = Date.now()

  // Function to add a request subscriber to the pending queue
  const addSubscriber = (subscriber: SubscriberItemType) => {
    refreshSubscribers.push(subscriber)
  }

  // Execute all api expired
  const executeAndClearSubscriber = (token = "") => {
    refreshSubscribers.forEach((cb) => cb(token))
    refreshSubscribers = []
  }

  // Handle refresh token
  const handleRefreshToken = async () => {
    try {
      const response = await refreshToken()
      if (response?.token) {
        executeAndClearSubscriber(response.token)
        lastRefreshTime = Date.now()
        isTokenRefreshing = false
        return response
      }
    } catch (error) {
      getLogout()()
      throw new Error(
        error instanceof Error ? error.message : "Failed to refresh token"
      )
    }
  }

  const fetchData = async <T>(
    props = RequestPropertyInit
  ): Promise<ResponseData<T>> => {
    const {
      url,
      method,
      params,
      payload,
      headers,
      responseType = "json",
      isRetry,
      qsStringifyOptions,
      fetchOptions,
      isAuth = true,
      throwError = true,
      transformRequest
    } = props

    let resource = url

    const token = getToken()
    const isAuthenticated = token && isAuth
    const baseHeaders = getHeaders()
    let locale = (headers as Record<string, string>)?.["Accept-Language"]

    if (!locale && typeof window !== "undefined") {
      locale = await getLocale()
    }

    const requestHeaders = {
      ...(isAuthenticated ? { Authorization: token } : {}),
      ...headers,
      ...baseHeaders,
      "Accept-Language": locale
    }

    const requestOption: RequestInit = {
      ...fetchOptions,
      method,
      headers: requestHeaders
    }
    if (method === "GET" && params) {
      resource = `${resource}?${qs.stringify(params, qsStringifyOptions)}`
    } else {
      requestOption.body = transformRequest?.(payload) || payload
    }

    try {
      const response = await fetch(resource, requestOption)
      if (response.ok) {
        const data = await convertResponse(response, responseType)

        return {
          responseData: data,
          success: true,
          headers: response.headers
        }
      }

      if (isRetry) {
        onRetryFailed()
        throw new Error("Not permission")
      }

      if (!shouldRefreshToken(response)) {
        const errorData = await convertResponse(response, responseType)
        throw errorData
      }

      const lastRefreshDuration = Date.now() - lastRefreshTime

      if (!isTokenRefreshing) {
        // Prevent call multi api same Promise in Chrome
        if (lastRefreshDuration < minTokenRefreshDuration) {
          return fetchData({
            ...props,
            headers: {
              ...props.headers,
              Authorization: getToken() || ""
            },
            isRetry: true
          })
        }
        isTokenRefreshing = true
        handleRefreshToken()
      }
      const fetchDataQueue: Promise<ResponseData<any>> = new Promise(
        (resolve) => {
          addSubscriber((token) => {
            resolve(
              fetchData({
                ...props,
                headers: {
                  ...props.headers,
                  Authorization: token
                },
                isRetry: true
              })
            )
          })
        }
      )
      return fetchDataQueue
    } catch (error) {
      let errData: any = {}
      if (error instanceof Error) {
        errData.message = error.message
      } else {
        errData = error
      }
      if (throwError) {
        throw new Error(errData.message)
      }
      return {
        success: false,
        errorMessage: errData?.message,
        metadata: errData?.metadata,
        responseData: {} as T,
        headers: errData.headers
      }
    }
  }

  return { fetchData }
}
