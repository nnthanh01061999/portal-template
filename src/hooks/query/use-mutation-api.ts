import {
  MutationFunction,
  useMutation,
  UseMutationOptions
} from "@tanstack/react-query"
import { useLocale, useTranslations } from "next-intl"

import { useNotify } from "@/components/providers/notify-provider"
import { apiConfig } from "@/configs/api"
import { RequestConfig, ResponseError } from "@/helpers/fetch/fetch-type"
import { sendRequest } from "@/helpers/fetch/send-request"
import { injectVariablesToPath } from "@/helpers/fetch/util"
import { DeepPartial } from "@/types"

type TVariables<
  TPayload,
  TKey extends ApiKey = ApiKey
> = DeepPartial<TPayload> & {
  pathVariables?: TExtractParams<TKey>
  params?: RequestConfig<any>["params"]
}

type UseMutationApiOptions<
  TPayload,
  TData,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _TError,
  TKey extends ApiKey = ApiKey
> = UseMutationOptions<TData, ResponseError, TPayload> & {
  pathVariables?: TExtractParams<TKey>
  keepOriginalResponse?: boolean
  keepParams?: boolean
  headers?: RequestConfig<TData>["headers"]
}

function useMutationApi<
  TPayload = any,
  TData = unknown,
  TError = unknown,
  TKey extends ApiKey = ApiKey
>(
  apiKey: TKey,
  opts?: UseMutationApiOptions<TVariables<TPayload, TKey>, TData, TError, TKey>
) {
  const {
    pathVariables: defaultPathVariables = {},
    keepOriginalResponse = false,
    keepParams = false,
    headers,
    ...rest
  } = opts || {}
  const { url, options } = apiConfig[apiKey]
  const { method: methodOption } = options
  const { notify } = useNotify()
  const locale = useLocale()
  const t = useTranslations()

  const mutationFn: MutationFunction<
    TData,
    TVariables<TPayload, TKey>
  > = async (payload) => {
    const {
      pathVariables: payloadPathVariables,
      params = {},
      ...payloadRest
    } = payload

    const pathVariables = payloadPathVariables || defaultPathVariables
    const urlObject = new URL(
      pathVariables ? injectVariablesToPath(url, pathVariables) : url
    )

    const paramsProps = { params: { ...payloadRest, ...params } }
    const dataProps = {
      payload: Array.isArray(payload) ? payload : payloadRest
    }
    const methodProps = methodOption === "GET" ? paramsProps : dataProps

    const res = await sendRequest({
      url: urlObject.href,
      throwError: true,
      ...options,
      method: methodOption,
      headers: {
        ...options.headers,
        ...headers,
        "Accept-Language": locale
      },
      ...methodProps,
      ...(keepParams ? { params } : {})
    })
    return (keepOriginalResponse ? res : res.responseData) as TData
  }

  return useMutation<TData, ResponseError, TVariables<TPayload, TKey>>({
    mutationFn,
    onError: (err: any) => {
      notify.error({
        message: t("Common.error"),
        description: err.message
      })
    },
    ...rest
  })
}

export default useMutationApi
