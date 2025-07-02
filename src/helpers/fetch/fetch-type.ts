import { IStringifyOptions } from "qs"

import { Assign } from "@/types"

export type ResponseType = "json" | "text" | "blob"

export type RequestConfig<T> = Assign<
  RequestInit,
  Pick<Request, "url" | "method"> & {
    method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "HEAD" | "OPTIONS"
    isAuth?: boolean
    isRetry?: boolean
    responseType?: ResponseType
    transformRequest?: (data: T) => any
    fetchOptions?: RequestInit
    qsStringifyOptions?: IStringifyOptions
    params?: Record<string, any>
    payload?: Record<string, any>
    headers?: HeadersInit
    throwError?: boolean
  }
>

export type RequestConfigProps<T> = Omit<RequestConfig<T>, "url" | "method">

export interface ResponseData<T> {
  success: boolean
  responseData: T
  errorMessage?: string
  metadata?: Record<string, any>
  headers: Headers
  [key: string]: any
}

export type SubscriberItemType = (token: string) => void

export interface RefreshTokenResponse {
  token?: string
}

export interface ResponseError {
  status?: number
}

export interface CreateRequestProps {
  getToken: () => string
  onRetryFailed: () => void
  refreshToken: () => Promise<RefreshTokenResponse>
  shouldRefreshToken: (response: ResponseError) => boolean
  minTokenRefreshDuration?: number
}
