"use client"

import { useQuery, UseQueryOptions } from "@tanstack/react-query"
import { useLocale, useTranslations } from "next-intl"
import { useRef } from "react"

import { useNotify } from "@/components/providers/notify-provider"
import { apiConfig } from "@/configs/api"
import { RequestConfig } from "@/helpers/fetch/fetch-type"
import { sendRequest } from "@/helpers/fetch/send-request"
import { injectVariablesToPath } from "@/helpers/fetch/util"

export interface TUseQueryApiOptions<
  TData = unknown,
  TKey extends ApiKey = ApiKey
> extends Omit<RequestConfig<TData>, "method" | "url">,
    Omit<UseQueryOptions<TData>, "queryKey"> {
  pathVariables?: TExtractParams<TKey>
  onError?: (error: ReturnType<Awaited<typeof useQuery>>["error"]) => void
  onSuccess?: (data: TData) => void
}

function useQueryApi<TData, TKey extends ApiKey = ApiKey>(
  apiKey: TKey,
  opts?: TUseQueryApiOptions<TData, TKey>
) {
  const {
    pathVariables = {},
    params,
    headers,
    payload,
    onError,
    onSuccess,
    ...rest
  } = opts ?? {}
  const { url, options } = apiConfig[apiKey]
  const method = options.method
  const apiPath = pathVariables
    ? injectVariablesToPath(url, pathVariables)
    : url

  const firstCallRef = useRef<boolean>(false)
  const { notify } = useNotify()
  const t = useTranslations("Common")
  const locale = useLocale()

  return useQuery({
    queryKey: [apiKey, ...Object.values(pathVariables), params, payload],
    queryFn: () => {
      const requestOptions: RequestConfig<any>["headers"] = {
        ...apiConfig[apiKey].options.headers,
        ...headers,
        "Accept-Language": locale
      }
      return sendRequest({
        method,
        throwError: true,
        url: apiPath,
        headers: requestOptions,
        params,
        payload
      })
        .then((res) => {
          if (!firstCallRef.current) {
            onSuccess?.(res.responseData as TData)
            firstCallRef.current = true
          }

          return res.responseData as TData
        })
        .catch((error) => {
          if (onError) {
            onError?.(error)
          } else {
            notify.error({
              message: t("error"),
              description: error.message
            })
          }
          throw error
        })
    },
    retry: false,
    ...rest
  })
}

export default useQueryApi
