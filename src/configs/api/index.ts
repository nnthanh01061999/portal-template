import { RequestConfig } from "@/helpers/fetch/fetch-type"

import auth from "./auth"
import notification from "./notification"
import sample from "./template"

declare global {
  type ApiKey = keyof typeof apiConfig

  type ApiConfig = {
    url: PathWithOptionalColon
    options?: Omit<RequestConfig<any>, "url">
  }

  type PathWithOptionalColon =
    | `${string}:${string}/${string}`
    | `${string}/${string}`

  type ApiKeyValue<T extends ApiKey = ApiKey> = (typeof apiConfig)[T]

  type ExtractRouteParams<T extends string> =
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    T extends `${infer _Start}:${infer Param}/${infer Rest}`
      ? { [K in Param | keyof ExtractRouteParams<Rest>]: string }
      : // eslint-disable-next-line @typescript-eslint/no-unused-vars
        T extends `${infer _Start}:${infer Param}`
        ? { [K in Param]: string | number | undefined }
        : undefined

  type TExtractParams<T extends ApiKey> = ExtractRouteParams<
    ApiKeyValue<T>["url"]
  >
}

export const apiConfig = {
  ...auth,
  ...sample,
  ...notification
} satisfies Record<string, ApiConfig>
