import { Descriptions, DescriptionsProps } from "antd"

import MobileColumn from "@/components/table/components/mobile/row-cell"
import { TTableColumn } from "@/types"

type TMobileRowCellGroupProps<T> = {
  columns: TTableColumn<T>
  value: T
  record: T
  index: number
}

function MobileRowCellGroup<T>(props: TMobileRowCellGroupProps<T>) {
  const { columns, index, record, value } = props
  const items = columns.reduce(
    (prev, cur): NonNullable<DescriptionsProps["items"]> => [
      ...prev,
      {
        key: cur.dataIndex as React.Key,
        label: cur.title as any,
        children: (
          <MobileColumn
            column={cur}
            index={index}
            record={record}
            value={value}
          />
        )
      }
    ],
    [] as NonNullable<DescriptionsProps["items"]>
  )
  return <Descriptions size="small" layout="horizontal" items={items} />
}

export default MobileRowCellGroup
