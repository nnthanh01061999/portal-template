import { RequestConfig } from "@/helpers/fetch/fetch-type"

export const HttpStatusCode = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404
}

export const RequestPropertyInit: RequestConfig<any> = {
  url: "",
  method: "GET",
  isAuth: true,
  transformRequest: (data) => JSON.stringify(data),
  responseType: "json",
  qsStringifyOptions: undefined
}
