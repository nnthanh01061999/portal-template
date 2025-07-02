import { TTableColumn } from "@/types"

type TMobileRowCellProps<T> = {
  column: TTableColumn<T>[number]
  value: T
  record: T
  index: number
}

const MobileRowCell = <T,>(props: TMobileRowCellProps<T>) => {
  const { column, index, record, value } = props
  if (column.render)
    return column.render(
      column.dataIndex
        ? record?.[column.dataIndex as keyof typeof record]
        : value,
      record,
      index
    )
  return record?.[column.dataIndex as keyof typeof record] as any
}

export default MobileRowCell
