import { usePathname, useRouter, useSearchParams } from "next/navigation"
import qs from "qs"
import { useCallback, useMemo } from "react"

import getQueryString, { GetQueryString } from "@/utils/query-params"

export type FilterQuery = {
  data: Record<string, unknown>
  pathname?: string
  scrollTop?: boolean
  reset?: boolean
} & Omit<GetQueryString, "data" | "searchParams">

export type TUseFilterQueryParamsOptions = {
  replace?: boolean
  scrollTop?: boolean
  getQuery?: typeof getQueryString
}

export default function useFilterQueryParams(
  options?: TUseFilterQueryParamsOptions
) {
  const {
    replace = true,
    scrollTop = true,
    getQuery = getQueryString
  } = options || {}
  const searchParams = useSearchParams()
  const router = useRouter()
  const currentPathname = usePathname()

  const params = useMemo(() => {
    return qs.parse(searchParams?.toString() || "")
  }, [searchParams])

  const setParams = useCallback(
    ({ data, pathname, scrollTop: localScrollTop, reset }: FilterQuery) => {
      const method = replace ? router.replace : router.push
      const targetPath = pathname || currentPathname
      const queryString = getQuery({
        data,
        searchParams:
          reset || !searchParams
            ? new URLSearchParams()
            : searchParams || new URLSearchParams()
      })
      method(`${targetPath}?${queryString}`, {
        scroll: localScrollTop ?? scrollTop ?? true
      })
    },
    [
      currentPathname,
      getQuery,
      replace,
      router.push,
      router.replace,
      scrollTop,
      searchParams
    ]
  )

  return { params, setParams }
}
