import { DatePickerProps } from "antd"
import dayjs, { Dayjs } from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat" // ES 2015
import timezone from "dayjs/plugin/timezone"
import utc from "dayjs/plugin/utc"

import {
  DATETIME_FORMAT_DISPLAY,
  DATETIME_FORMAT_LOCALE_VALUE
} from "@/constants"
import { TTemplateFormat } from "@/types"

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(customParseFormat)

export const removeTime = (date: string) => {
  return dayjs.utc(date).tz("Asia/Ho_Chi_Minh").startOf("day").format()
}

export const formatDateTime = (
  date: dayjs.ConfigType,
  formatString: string,
  fallback = ""
): string => {
  if (!date) return fallback
  if (dayjs(date).isValid()) {
    return dayjs(date).format(formatString)
  }
  return fallback
}

export const formatDateTimeTemplate = (
  date: dayjs.ConfigType,
  formatString: string,
  fallback = "",
  template?: TTemplateFormat
): string => {
  const formattedValue = formatDateTime(date, formatString, fallback)
  return template && template.includes("{value}")
    ? formattedValue
      ? template.replace("{value}", formattedValue)
      : fallback
    : formattedValue
}

export const formatDateSecond = (
  date?: number,
  formatString = DATETIME_FORMAT_DISPLAY,
  fallback = ""
): string => {
  if (!date) return fallback
  const parseDate = dayjs.unix(date)
  if (!parseDate.isValid()) return fallback
  return parseDate.format(formatString)
}

export const getLocaleString = (date: dayjs.ConfigType) => {
  if (!dayjs(date).isValid()) return
  return dayjs(date).format(DATETIME_FORMAT_LOCALE_VALUE)
}

export const parseDate = (date?: dayjs.ConfigType, format?: string) => {
  if (!date) return
  const parseDate = dayjs(date, format)
  if (!parseDate.isValid()) return
  return parseDate
}

export const parseDateSecond = (date: number) => {
  if (date < 0) return undefined
  const parseDate = dayjs.unix(date)
  if (!parseDate.isValid()) return
  return parseDate
}

export const disabledDatePast: DatePickerProps["disabledDate"] = (current) => {
  return current < dayjs().startOf("day")
}

export const calculateDaysBetween = (
  fromDate?: Dayjs,
  toDate?: Dayjs
): number => {
  if (!!fromDate && !!toDate) {
    return toDate?.diff(fromDate, "day")
  } else {
    return 0
  }
}
