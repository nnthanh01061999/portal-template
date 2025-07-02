import { convertArrayToObject } from "@/utils/array"

export const STATUS_OPTIONS = [
  { label: "Common.active", value: true, color: "green" },
  { label: "Common.inactive", value: false, color: "red" }
]

export const STATUS_OPTIONS_MAP = convertArrayToObject(STATUS_OPTIONS)

export const BOOLEAN_OPTIONS = [
  { label: "Common.yes", value: true, color: "green" },
  { label: "Common.no", value: false, color: "red" }
]

export const BOOLEAN_OPTIONS_MAP = convertArrayToObject(BOOLEAN_OPTIONS)
