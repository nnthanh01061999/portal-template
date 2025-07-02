import { TableProps } from "antd/es/table/InternalTable"
import { useMemo } from "react"

import { TTableHeaderProps } from "@/components/table/components/table-header"
import { responsiveColumns } from "@/components/table/utils"
import { TResponsiveColumnProps, TTableColumn, TTree } from "@/types"

type TUseResponsiveColumnProps<T extends TTree> = {
  columns: TTableColumn<T>
  isExpanded?: boolean
  rowSelection?: TableProps<T>["rowSelection"]
  headerProps?: TTableHeaderProps
  responsiveProps?: Partial<TResponsiveColumnProps<T>>
}

const useResponsiveColumn = <T extends TTree>(
  props: TUseResponsiveColumnProps<T>
) => {
  const { columns, headerProps, responsiveProps, isExpanded, rowSelection } =
    props

  const allColumns = useMemo(() => {
    return responsiveColumns({ ...responsiveProps, columns, headerProps })
  }, [columns, headerProps, responsiveProps])

  const [mobileColumn, ...desktopColumns] = allColumns

  return {
    responsiveColumns:
      rowSelection && !isExpanded ? desktopColumns : allColumns,
    mobileColumn
  }
}

export default useResponsiveColumn
