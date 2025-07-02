import {
  ButtonProps,
  DescriptionsProps,
  MenuProps,
  TableColumnType
} from "antd"
import { ColumnsType } from "antd/es/table"

import { TTableHeaderProps } from "@/components/table/components/table-header"

type TTableResponsiveProps = Omit<
  NonNullable<DescriptionsProps["items"]>[number],
  "children"
>

export type TExtendedColumnProps = {
  hideOnResponsive?: boolean
  responsiveOrder?: number
  responsiveProps?: TTableResponsiveProps
  collapse?: boolean | string
  cellGroup?: string
  cellOrder?: number
}

export type TTableColumnType<T> = TableColumnType<T> &
  TExtendedColumnProps &
  ColumnsType<T>[number]

export type TTableColumn<T> = TTableColumnType<T>[]

export type MenuItem = Required<MenuProps>["items"][number]

export type TResponsiveColumnProps<T> = {
  enabled?: boolean
  columns: TTableColumn<T>
  actionItems?: ButtonProps[]
  descriptionProps?: DescriptionsProps
  headerProps?: TTableHeaderProps
}
