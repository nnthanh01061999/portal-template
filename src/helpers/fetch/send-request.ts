import { apiConfig } from "@/configs/api"
import { STORE_KEYS } from "@/constants"
import { getCookieJson } from "@/helpers/cookies/client"
import { HttpStatusCode, RequestPropertyInit } from "@/helpers/fetch/config"
import { RequestConfig, ResponseError } from "@/helpers/fetch/fetch-type"
import { createRequest } from "@/helpers/fetch/util"
import { AuthData, getLogout, getSetAccessToken } from "@/stores/stores/auth"
import { TZustandStore } from "@/types"

const urlRefreshToken = apiConfig["authentication/refresh-token"].url

const getTokenUser = () => {
  const data = getCookieJson<TZustandStore<AuthData>>(STORE_KEYS.auth)
  const { accessToken, tokenType } = data?.state ?? {}
  return accessToken ? `${tokenType ?? ""} ${accessToken ?? ""}` : ""
}

const getRefreshTokenUser = () => {
  const data = getCookieJson<TZustandStore<AuthData>>(STORE_KEYS.auth)
  const { refreshToken, tokenType } = data?.state ?? {}
  return refreshToken ? `${tokenType ?? ""} ${refreshToken ?? ""}` : ""
}

const onRetryFailed = () => {
  const logout = getLogout()
  logout()
  window.location.replace("/")
}

const shouldRefreshToken = (response: ResponseError) =>
  response.status === HttpStatusCode.UNAUTHORIZED

const refreshToken = async () => {
  const setAccessToken = getSetAccessToken()
  try {
    const response = await fetch(urlRefreshToken, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: getRefreshTokenUser()
      }
    })
    if (response.ok) {
      const data = await response.json()
      setAccessToken({
        accessToken: data?.data?.access_token
      })
      return {
        token: `${data?.data?.token_type || "Bearer"} ${
          data?.data?.access_token
        }`
      }
    } else if (response.status === HttpStatusCode.UNAUTHORIZED) {
      onRetryFailed()
      throw new Error("Refresh token is expired")
    } else {
      throw new Error("Failed to refresh token")
    }
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to refresh token"
    )
  }
}

const { fetchData } = createRequest({
  refreshToken,
  getToken: getTokenUser,
  onRetryFailed,
  shouldRefreshToken,
  minTokenRefreshDuration: 200
})

const sendRequest = <T>(props: RequestConfig<T>) => {
  return fetchData<T>({
    ...RequestPropertyInit,
    ...props
  })
}

export { sendRequest }
