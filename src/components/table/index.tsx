import { Table, TablePaginationConfig, TableProps } from "antd"
import { memo, useMemo } from "react"

import TableHeader, {
  TTableHeaderProps
} from "@/components/table/components/table-header"
import useResponsiveColumn from "@/components/table/hooks/use-responsive-column"
import { renderCell, renderColumnTitle } from "@/components/table/utils"
import { useResponsive } from "@/hooks/use-responsive"
import { Assign, TResponsiveColumnProps, TTableColumn, TTree } from "@/types"

type BaseTableProps<T extends TTree> = Assign<
  TableProps<T>,
  {
    columns: TTableColumn<T>
    headerProps?: TTableHeaderProps
    responsiveProps?: Partial<TResponsiveColumnProps<T>>
  }
>

const BaseTable = <T extends TTree>({
  columns,
  responsiveProps,
  headerProps,
  rowSelection,
  dataSource,
  pagination,
  ...tableProps
}: BaseTableProps<T>) => {
  const { isMobile } = useResponsive()

  const isExpanded = useMemo(
    () => !!dataSource?.find((data) => data?.children?.length),
    [dataSource]
  )

  const headerPropsMapping = useMemo(() => {
    return {
      total: (pagination as TablePaginationConfig)?.total || 0,
      ...(headerProps || {})
    }
  }, [headerProps, pagination])

  const { responsiveColumns, mobileColumn } = useResponsiveColumn<T>({
    columns,
    rowSelection,
    isExpanded,
    responsiveProps,
    headerProps: headerPropsMapping
  })

  const stickyConfig = useMemo(() => {
    return {
      offsetHeader: isMobile ? 150 : 146
    }
  }, [isMobile])

  const rowSelectionConfig = useMemo(() => {
    if (!rowSelection) return undefined
    return {
      ...rowSelection,
      ...(!isExpanded && isMobile
        ? {
            columnTitle: renderColumnTitle(mobileColumn),
            renderCell: renderCell(mobileColumn)
          }
        : {})
    }
  }, [isExpanded, mobileColumn, rowSelection, isMobile])

  return (
    <Table
      sticky={stickyConfig}
      title={
        isMobile ? undefined : () => <TableHeader {...headerPropsMapping} />
      }
      {...tableProps}
      dataSource={dataSource}
      columns={responsiveColumns}
      rowSelection={rowSelectionConfig}
      pagination={pagination}
    />
  )
}

export default memo(BaseTable)
