import { Dayjs } from "dayjs"

import { TFieldType } from "@/types/form"

const convertOriginal = (value: unknown, name: string) => ({ [name]: value })

const convertStringArray = (value: unknown, name: string) => ({
  [name]: typeof value === "string" ? value.split(",") : value
})

const convertDate = (value: unknown, name: string) => ({
  [name]: (value as Dayjs).toISOString()
})

const convertDateRange = (value: unknown, name: string) => ({
  [`from_${name}`]: (value as Dayjs[])?.[0]?.toISOString(),
  [`to_${name}`]: (value as Dayjs[])?.[1]?.toISOString()
})

const convertBoolean = (value: unknown, name: string) => ({
  [name]: Boolean(value)
})

export const formConvertStrategy = {
  STRING: convertOriginal,
  INTEGER: convertOriginal,
  STRING_ARRAY: convertStringArray,
  DATE: convertDate,
  TIME: convertDate,
  DATE_RANGE: convertDateRange,
  BOOLEAN: convertBoolean
} satisfies Record<
  TFieldType,
  (value: unknown, name: string) => Record<string, unknown>
>
