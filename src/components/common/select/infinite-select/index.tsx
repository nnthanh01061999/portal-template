import { LoadingOutlined } from "@ant-design/icons"
import { Empty, Select, SelectProps } from "antd"
import {
  forwardRef,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState
} from "react"

import { DEFAULT_PAGINATION } from "@/constants"
import useInfiniteQueryApi from "@/hooks/query/use-infinite-query-api"
import { useDebounceValue } from "@/hooks/use-debounce-value"
import { cn } from "@/lib/utils"
import { Assign, TOption } from "@/types"
import { getNextPage } from "@/utils/format"
import { get, isArray } from "@/utils/lodash"
import { removeAccents } from "@/utils/search"

export interface IInfiniteSelectSearchProps {
  searchThreshold?: number
  searchKey?: string
  searchLocal?: boolean
}

export interface IInfiniteSelectOther {
  [key: string]: number | string | boolean | undefined | null
}

export interface IInfiniteSelectConfigProps {
  apiKey: ApiKey
  valueKey: string
  labelKey: string | string[]
  responseKey?: string
  totalKey?: string
  indexKey?: string
  limitKey?: string
  limit?: number
  search?: IInfiniteSelectSearchProps
  otherFilters?: IInfiniteSelectOther
  customLabel?: (label: any) => ReactNode
  fetchOnFocus?: boolean
  enabled?: boolean
  autoFillLabel?: boolean
  valueSearchKeys?: string
  formatData?: (data: any) => any
  headers?: HeadersInit
}

export interface IInternalInfiniteSelectProps extends SelectProps {
  apiConfig: IInfiniteSelectConfigProps
}

export type TInfiniteSelectProps = Assign<
  IInternalInfiniteSelectProps,
  { apiConfig?: Partial<IInternalInfiniteSelectProps["apiConfig"]> }
>

export interface IInfiniteSelectParams {
  page: number
  limit: number
  search?: string
  [key: string]: any
}

export interface IInfiniteSelectState {
  focus: boolean
  options: TOption<string>[]
  search?: string
  searchKey: string
  loading: boolean
  refresh: boolean
}

const DEFAULT_LIMIT = 20

const InfiniteSelect = forwardRef<any, IInternalInfiniteSelectProps>(
  (props, ref) => {
    const {
      apiConfig,
      onChange,
      labelInValue = false,
      showSearch = true,
      ...selectProps
    } = props
    const {
      apiKey,
      valueKey,
      labelKey,
      customLabel,
      search,
      otherFilters,
      responseKey = "data.items",
      totalKey = "data.total",
      indexKey = "index",
      limitKey = "limit",
      limit = DEFAULT_LIMIT,
      fetchOnFocus = false,
      enabled = true,
      autoFillLabel = true,
      valueSearchKeys,
      formatData,
      headers
    } = apiConfig

    const {
      searchThreshold = 0,
      searchKey = "keyword",
      searchLocal = false
    } = search || {}
    const { mode, value } = selectProps

    const [state, setState] = useState<IInfiniteSelectState>({
      focus: false,
      options: [],
      search: undefined,
      searchKey,
      //this state is used for initial loading
      loading: true,
      //pagination
      refresh: true
    })

    const { debouncedValue } = useDebounceValue(state.search, 300)

    const valueSearchKey = useMemo(
      () => valueSearchKeys || `${valueKey}s`,
      [valueSearchKeys, valueKey]
    )

    const searchValue = useMemo(() => {
      if (state.searchKey === valueSearchKey) {
        if (mode === "multiple") {
          return isArray(value) ? value : [value]
        }
        return value
      }
      return debouncedValue || undefined
    }, [debouncedValue, mode, state.searchKey, value, valueSearchKey])

    const {
      data,
      fetchNextPage,
      hasNextPage,
      isFetchingNextPage,
      isLoading,
      isFetching,
      isError
    } = useInfiniteQueryApi(apiKey, {
      headers,
      gcTime: 0,
      retry: false,
      initialPageParam: {
        [indexKey]: DEFAULT_PAGINATION.index,
        [limitKey]: limit,
        total: DEFAULT_PAGINATION.total,
        refresh: DEFAULT_PAGINATION.refresh
      },
      getNextPageParam: (lastPage, totalPage) => {
        const total = get(lastPage, totalKey)
        const index = totalPage.length
        const nextPage = getNextPage(total, index, limit)
        return nextPage
          ? { [indexKey]: nextPage, [limitKey]: limit, total, refresh: false }
          : undefined
      },
      params: {
        [state.searchKey]: searchValue,
        ...otherFilters
      },
      enabled:
        enabled &&
        (fetchOnFocus ? !!state.focus : true) &&
        (searchThreshold
          ? !!(searchValue && searchValue?.length >= searchThreshold)
          : true)
    })

    const options: SelectProps["options"] = useMemo(() => {
      if (isError) return []
      const optionsFormat = formatData
        ? formatData(state.options)
        : state.options
      return (
        optionsFormat?.map((item: any) => {
          const value = getValueFromKey(item, valueKey)
          const label = getLabel(item, labelKey, customLabel)

          return { label, value: String(value), data: item }
        }) || []
      )
    }, [customLabel, formatData, isError, labelKey, state.options, valueKey])

    const onFocus = useCallback(() => {
      setState((prev) => ({ ...prev, focus: true }))
    }, [])

    const onOpenChange = useCallback(() => {
      setState((prev) => ({ ...prev, search: undefined, searchKey }))
    }, [searchKey])

    const onSearch = useCallback(
      (value: string) => {
        setState((prev) => ({
          ...prev,
          search: value,
          searchKey,
          refresh: true
        }))
      },
      [searchKey]
    )

    const handleChange = useCallback(
      (value: any, option: any) => {
        if (!onChange) return
        if (mode === "multiple") {
          onChange(value[0] ? value : undefined, state.options)
        } else {
          const valueMatchMode = labelInValue
            ? { ...option.data, ...value }
            : value
          onChange(value ? valueMatchMode : undefined, state.options)
        }
      },
      [labelInValue, mode, onChange, state.options]
    )

    const onLoadMore = useCallback(() => {
      fetchNextPage()
    }, [fetchNextPage])
    const onScroll = useCallback(
      (e: any) => {
        const { scrollTop, scrollHeight, offsetHeight } = e.currentTarget
        if (
          !(isLoading || isFetchingNextPage) &&
          scrollTop + offsetHeight >= scrollHeight &&
          hasNextPage
        ) {
          onLoadMore()
        }
      },
      [hasNextPage, isFetchingNextPage, isLoading, onLoadMore]
    )

    const onClear = useCallback(
      () => setState((prev) => ({ ...prev, search: undefined, searchKey })),
      [searchKey]
    )

    const _formatOptions = useCallback(() => {
      const pages = data?.pages

      if (!pages) {
        setState((prev) => ({ ...prev, loading: false }))
        return
      }
      const options = pages?.reduce(
        (prev, cur) => [
          ...prev,
          ...(responseKey ? get(cur, responseKey, []) : cur)
        ],
        []
      )
      setState((prev) => ({ ...prev, loading: false, options }))
    }, [data?.pages, responseKey])

    useEffect(() => {
      _formatOptions()
    }, [_formatOptions])

    useEffect(() => {
      if (
        !labelInValue &&
        autoFillLabel &&
        value &&
        !state.options?.length &&
        !state.focus
      ) {
        setState((prev) => ({
          ...prev,
          searchKey: valueSearchKey,
          focus: true
        }))
      }
    }, [
      autoFillLabel,
      labelInValue,
      state.focus,
      state.options?.length,
      value,
      valueSearchKey
    ])

    return (
      <Select
        ref={ref}
        optionLabelProp="label"
        optionFilterProp="label"
        notFoundContent={
          state.loading ? (
            <LoadingOutlined spin />
          ) : (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          )
        }
        allowClear
        {...selectProps}
        className={cn("w-full", selectProps.className)}
        options={options}
        loading={selectProps.loading || isFetching || isFetchingNextPage}
        labelInValue={labelInValue}
        searchValue={state.search}
        showSearch={showSearch}
        onSearch={searchLocal ? undefined : onSearch}
        onPopupScroll={onScroll}
        onFocus={onFocus}
        onChange={handleChange}
        onClear={onClear}
        onOpenChange={onOpenChange}
        filterOption={
          searchLocal
            ? (search, option) => {
                const label =
                  typeof option?.label === "string"
                    ? option.label
                    : getValueFromKey(option?.data, labelKey)
                return removeAccents(label)
                  .toLocaleLowerCase()
                  .includes(removeAccents(search).toLocaleLowerCase())
              }
            : false
        }
      />
    )
  }
)

InfiniteSelect.displayName = "InfiniteSelect"

export default InfiniteSelect

const getValueFromKey = (data: any, key: string | string[]) => {
  if (typeof key === "string") {
    return data?.[key]
  } else if (Array.isArray(key)) {
    return key
      .map((item) => get(data, item, undefined))
      ?.filter(Boolean)
      ?.join(" - ")
  }
}
const getLabel = (
  item: any,
  labelKey: string | string[],
  customLabel?: (label: any) => ReactNode
) => {
  if (customLabel instanceof Function) {
    return customLabel(item)
  }
  return typeof labelKey === "string"
    ? item?.[labelKey]
    : getValueFromKey(item, labelKey)
}
