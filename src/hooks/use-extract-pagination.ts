import { useMemo } from "react"

import { DEFAULT_PAGINATION } from "@/constants"

type TUseExtractPaginationProps = {
  currentValues?: Record<string, any>
}

const useExtractPagination = (props: TUseExtractPaginationProps) => {
  const { currentValues } = props

  const pagination = useMemo(() => {
    return {
      index: currentValues?.["pagination.index"] || DEFAULT_PAGINATION.index,
      limit: currentValues?.["pagination.limit"] || DEFAULT_PAGINATION.limit,
      total: currentValues?.["pagination.total"] || DEFAULT_PAGINATION.total,
      refresh:
        currentValues?.["pagination.refresh"] || DEFAULT_PAGINATION.refresh
    }
  }, [currentValues])

  return { pagination }
}

export default useExtractPagination
