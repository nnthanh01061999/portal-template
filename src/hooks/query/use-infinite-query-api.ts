import {
  useInfiniteQuery,
  UseInfiniteQueryOptions
} from "@tanstack/react-query"
import { useLocale, useTranslations } from "next-intl"

import { useNotify } from "@/components/providers/notify-provider"
import { apiConfig } from "@/configs/api"
import { RequestConfig } from "@/helpers/fetch/fetch-type"
import { sendRequest } from "@/helpers/fetch/send-request"
import { injectVariablesToPath } from "@/helpers/fetch/util"

interface UseInfiniteQueryApiOptions<
  TData = unknown,
  TKey extends ApiKey = ApiKey
> extends Omit<RequestConfig<TData>, "method" | "url">,
    Omit<UseInfiniteQueryOptions<TData>, "queryKey"> {
  pathVariables?: TExtractParams<TKey>
  headers?: RequestConfig<TData>["headers"]
  params?: RequestConfig<TData>["params"]
  payload?: RequestConfig<TData>["payload"]
  nextParamsIsData?: boolean
  onError?: (
    error: ReturnType<Awaited<typeof useInfiniteQuery>>["error"]
  ) => void
}

function useInfiniteQueryApi<TData = any, TKey extends ApiKey = ApiKey>(
  apiKey: TKey,
  opts?: UseInfiniteQueryApiOptions<TData, TKey>
) {
  const {
    pathVariables = {},
    initialPageParam,
    headers,
    params,
    payload,
    nextParamsIsData = false,
    onError,
    ...rest
  } = opts ?? {}
  const { url, options } = apiConfig[apiKey]
  const method = options.method
  const apiPath = pathVariables
    ? injectVariablesToPath(url, pathVariables)
    : url

  const { notify } = useNotify()
  const locale = useLocale()
  const t = useTranslations()

  return useInfiniteQuery<TData>({
    queryKey: [
      `infinite-${apiKey}`,
      ...Object.values(pathVariables),
      { ...(initialPageParam || {}), _page: undefined, _limit: undefined },
      payload,
      params
    ],
    queryFn: ({ pageParam }) => {
      return sendRequest({
        method,
        throwError: true,
        url: apiPath,
        headers: {
          ...options.headers,
          ...headers,
          "Accept-Language": locale
        },
        params: {
          ...(initialPageParam || {}),
          ...params,
          ...(nextParamsIsData ? {} : (pageParam as any))
        },
        payload: { ...payload, ...(nextParamsIsData ? (pageParam as any) : {}) }
      })
        .then((res) => {
          return res.responseData
        })
        .catch((error) => {
          if (onError) {
            onError?.(error)
          } else {
            notify.error({
              message: t("Common.error"),
              description: error.message
            })
          }
          throw error
        })
    },
    retry: false,
    ...(rest as unknown as any)
  })
}

export default useInfiniteQueryApi
