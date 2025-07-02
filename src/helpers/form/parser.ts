import QueryString from "qs"

import { parseDate } from "@/helpers/date"
import { TFormComponentType, TFormItemConfig } from "@/types/form"

const parserString = (name: string, values?: QueryString.ParsedQs) =>
  values?.[name]

const parserNumber = (name: string, values?: QueryString.ParsedQs) => {
  let value = values?.[name] as string | number | undefined
  if (typeof value === "string") {
    const number = Number(value)
    if (!isNaN(number)) {
      value = number
    }
  }
  return { [name]: value }
}

const parserDate = (
  name: string,
  values?: QueryString.ParsedQs,
  config?: TFormItemConfig
) => {
  let value = undefined
  if (typeof value === "string") {
    const date = values?.[name]
    if (typeof date === "string") {
      value = parseDate(date, config?.format)
    }
    if (!value?.isValid()) {
      value = undefined
    }
  }
  return { [name]: value }
}

const parserDateRange = (name: string, values?: QueryString.ParsedQs) => {
  const from = values?.[`from_${name}`]
  const to = values?.[`to_${name}`]
  if (from && to) {
    return { [name]: [from, to] }
  }
  return { [name]: [] }
}

const parserBoolean = (name: string, values?: QueryString.ParsedQs) => {
  let value = values?.[name] as string | boolean | undefined
  if (typeof value === "string") {
    if (value.toLowerCase() === "true") {
      value = true
    } else if (value.toLowerCase() === "false") {
      value = false
    }
  }
  return { [name]: value }
}

export const formParserStrategy = {
  INPUT: parserString,
  TEXTAREA: parserString,
  NUMBER: parserNumber,
  SELECT: parserString,
  INFINITE_SELECT: parserString,
  DATE: parserDate,
  DATE_RANGE: parserDateRange,
  TIME: parserDate,
  CHECKBOX: parserString,
  RADIO: parserString,
  SWITCH: parserBoolean
} satisfies Record<
  TFormComponentType,
  (
    name: string,
    values?: QueryString.ParsedQs,
    config?: TFormItemConfig<object>
  ) => any
>
