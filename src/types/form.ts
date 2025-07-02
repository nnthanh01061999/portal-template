import { FormItemProps } from "antd"

import { TFilter } from "@/types/api"
import { Paths } from "@/types/common"

export type TFormComponentType =
  | "INPUT"
  | "TEXTAREA"
  | "NUMBER"
  | "SELECT"
  | "INFINITE_SELECT"
  | "DATE"
  | "DATE_RANGE"
  | "TIME"
  | "CHECKBOX"
  | "SWITCH"
  | "RADIO"

export type TFieldType =
  | "STRING"
  | "STRING_ARRAY"
  | "INTEGER"
  | "DATE"
  | "DATE_RANGE"
  | "TIME"
  | "BOOLEAN"

export type TFormType = "form" | "search"

export type TFormChildProps<F extends object = object> = {
  name: Paths<F>
  placeholder?: string
  disabled?: boolean
  allowClear?: boolean
  componentType: TFormComponentType
  fieldType?: TFieldType
  format?: string
  label?: string
}

export type TFormColProps = {
  colSpan?: number
  offset?: number
  colClassName?: string
}

export type TTemplateFilter = {
  filter: TFilter
}

export type TFormItemConfig<
  F extends object = object,
  T = unknown
> = FormItemProps &
  TFormColProps &
  TFormChildProps<F> & {
    childrenProps?: T
  }

export type TFormBaseProps<T = unknown> = T & {
  formType?: TFormType
  config: TFormChildProps<any>
}
