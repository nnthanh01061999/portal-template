import { TableProps } from "antd"
import { SortOrder } from "antd/es/table/interface"
import { useCallback, useMemo } from "react"

import { formConvertStrategy } from "@/helpers/form/convert"
import useFilterQueryParams, {
  TUseFilterQueryParamsOptions
} from "@/helpers/form/hooks/use-filter-query-params"
import { formParserStrategy } from "@/helpers/form/parser"
import { TTree } from "@/types"
import { TFormItemConfig } from "@/types/form"

export const SORT_ORDER_MAP = {
  ascend: "asc",
  descend: "desc"
}

export const ANTD_SORT_ORDER_MAP = {
  asc: "ascend",
  desc: "descend"
} as Record<string, SortOrder>

type TUseSearchResponse = {
  initValues?: Record<string, any>
  currentValues?: Record<string, any>
  onSearch: (values: Record<string, any>) => void
  onClear: () => void
  handleTableChange: <T extends TTree>(
    defaultParams: Record<string, any>
  ) => TableProps<T>["onChange"]
  setParams: ReturnType<typeof useFilterQueryParams>["setParams"]
}

type TUseSearchProps<F extends object = object> = {
  fields: TFormItemConfig<F>[]
  options?: TUseFilterQueryParamsOptions
}

export const useSearch = <F extends object = object>(
  props?: TUseSearchProps<F>
): TUseSearchResponse => {
  const { fields, options } = props || {}

  const { params, setParams } = useFilterQueryParams(options)

  const initValues = useMemo(() => {
    if (!fields) return {}
    const parsedParams = fields?.map((field) => {
      const parser = formParserStrategy[field.componentType]
      return {
        [field.name]: parser(field.name, params, field as TFormItemConfig)
      }
    })
    return parsedParams?.reduce(
      (acc, curr) => ({ ...acc, ...curr }),
      {} as Record<string, any>
    )
  }, [fields, params])

  const currentValues = useMemo(() => {
    if (!fields) return {}
    const parsedParams = fields?.reduce((acc, field) => {
      const parser = formParserStrategy[field.componentType]
      return {
        ...acc,
        [field.name]: parser(field.name, params, field as TFormItemConfig)
      }
    }, {})
    return parsedParams
  }, [fields, params])

  const onSearch = useCallback(
    (values: Record<string, any>) => {
      const data = fields?.reduce(
        (acc, field) => {
          let value = values?.[field.name]

          if (field.fieldType) {
            const convert = formConvertStrategy[field.fieldType]
            value = convert(value, field.name)
          } else {
            value = { [field.name]: value }
          }
          return { ...acc, ...value }
        },
        {} as Record<string, any>
      )
      setParams({ data: data || {}, reset: true })
    },
    [fields, setParams]
  )

  const onClear = useCallback(() => {
    setParams({ data: {}, reset: true })
  }, [setParams])

  const handleTableChange = useCallback(
    (defaultParams: Record<string, any>): TableProps["onChange"] =>
      (values, _, sorter) => {
        const { current, pageSize, total } = values
        if (!current) return

        const { field, order } = Array.isArray(sorter) ? sorter[0] : sorter
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { sort_by, sort_order, limit, ...newParams } =
          currentValues as Record<string, any>

        const sortParams = order
          ? {
              ["sort.order_by"]: field,
              ["sort.order"]: SORT_ORDER_MAP[order] || "asc"
            }
          : {}

        const data = {
          ...newParams,
          "pagination.index": current,
          "pagination.limit": pageSize,
          "pagination.refresh": pageSize !== limit,
          "pagination.total": total,
          ...sortParams,
          ...defaultParams
        }
        setParams({ data, reset: false })
      },
    [currentValues, setParams]
  )

  return {
    initValues,
    currentValues: params,
    setParams,
    onSearch,
    onClear,
    handleTableChange
  }
}
