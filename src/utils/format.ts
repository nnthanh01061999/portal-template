import { TTemplateFormatUnion } from "@/components/formats/template-format"
import { DEFAULT_PAGINATION } from "@/constants"
import { TTemplateFormat } from "@/types"
import { isNumber } from "@/utils/lodash"

export const getUniqueArrayObjectByKey = <T>(arr: T[], key: keyof T): T[] => {
  return arr.reduce((acc: T[], curr: any) => {
    const index = acc.findIndex((obj) => obj[key] === curr[key])
    if (index === -1) {
      acc.push(curr)
    }
    return acc
  }, [])
}

export const arrayToSet = (arr: string[]): Record<string, boolean> => {
  return arr?.reduce((prev, cur) => ({ ...prev, [cur]: true }), {})
}

export const safeNumber = (value: number | undefined, fallback = 0) =>
  value ? Number(value) : fallback

export const getNextPage = (
  total: number,
  index: number,
  limit: number = DEFAULT_PAGINATION.limit
) => {
  if (total > index * limit) {
    return index + 1
  }
  return null
}

export const removeAccents = (str: string): string => {
  if (str)
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D")

  return str
}

export const vietnameseIgnoreSearching = (
  value?: string | string[],
  keyword?: string
) => {
  if (Array.isArray(value)) {
    return !!value.find((item) =>
      removeAccents(item || "")
        .toLocaleLowerCase()
        .includes(removeAccents(keyword || "").toLocaleLowerCase())
    )
  }
  return removeAccents(value || "")
    .toLocaleLowerCase()
    .includes(removeAccents(keyword || "").toLocaleLowerCase())
}

export const formatNumber = (
  num: number,
  fallback = "",
  options?: Intl.NumberFormatOptions
): string => {
  if (!num) return fallback

  const formatter = new Intl.NumberFormat("en-EN", options)
  return formatter.format(num)
}

export const parseNumber = (value: string) => {
  return value?.replace(/\$\s?|(,*)/g, "")
}

export const formatNumberTemplate = ({
  value,
  fallback,
  template
}: {
  value?: number
  fallback: string
  template?: TTemplateFormat
}) => {
  const formatValue = formatNumber(value || 0, fallback)
  const priceValue = isNumber(value) ? formatValue : fallback
  return template && template.includes("{value}")
    ? isNumber(value) && value
      ? template.replace("{value}", priceValue)
      : fallback
    : priceValue
}

export const formatPrice = (
  num?: number,
  fallback = "",
  unit = "đ",
  options?: Intl.NumberFormatOptions
): string => {
  if (!num) return fallback
  return `${formatNumber(num || 0, fallback, options)} ${unit}`
}

export const formatPriceTemplate = ({
  value,
  fallback,
  unit,
  options,
  template
}: {
  value?: number
  fallback: string
  unit: string
  options: Intl.NumberFormatOptions
  template?: TTemplateFormat
}) => {
  const formatValue = formatPrice(value, fallback, unit, options)
  const priceValue = isNumber(value) ? formatValue : fallback
  return template && template.includes("{value}")
    ? isNumber(value)
      ? template.replace("{value}", priceValue)
      : fallback
    : priceValue
}

export const formatPriceToNumber = (
  formattedPrice: string,
  unit: string = "đ"
): number => {
  if (!formattedPrice) return 0

  // Remove the unit and any non-numeric characters like spaces, commas, or dots
  const numericPart = formattedPrice
    .replace(new RegExp(`\\s?${unit}`, "g"), "")
    .replace(/[^\d.-]/g, "")

  return parseFloat(numericPart) || 0
}

export const formatPhone = (phone?: string) => {
  if (!phone) return ""

  const part1 = phone.slice(0, 4)
  const part2 = phone.slice(4, 7)
  const part3 = phone.slice(7)

  return [part1, part2, part3].filter(Boolean).join(" ")
}

export const cleanPhoneNumber = (phone?: string) => {
  return phone ? phone.replace(/\s/g, "") : ""
}

export const toTitleCase = (value: string) => {
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
}

export const toLabelCase = (value: string): string => {
  return value
    .replace(/_/g, " ") // Replace underscores with spaces
    .trim() // Trim leading/trailing spaces
    .replace(/\s+/g, " ") // Replace multiple spaces with a single space
    .split(" ")
    .reduce(
      (prev, word) =>
        prev + " " + word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
      ""
    )
}

export const snakeCaseToTitleCase = (snakeCase: string) => {
  if (snakeCase === null || snakeCase === "") {
    return snakeCase
  }

  snakeCase = snakeCase?.trim()
  const newText = snakeCase?.split("_").join(" ")
  return newText
}

export const convertToSnakeCase = (text: string) => {
  return text.toLowerCase().replace(/ /g, "_")
}

export const getStringFormat = <T>(
  value: T,
  template: TTemplateFormatUnion,
  fallback = "--"
) => {
  if (!value || checkObjectEmptyValue(value)) return fallback

  const values = Object.entries(value)

  let result: string = template

  values.forEach(([key, value]) => {
    result = result.replace(`{${key}}`, value ? String(value) : fallback)
  })

  return result
}

export const checkObjectEmptyValue = (value: Record<string, any>) => {
  return Object.values(value).every(
    (value) => value === undefined || value === null || value === ""
  )
}

export const getStringFormatPure = (
  template?: TTemplateFormat,
  value?: string,
  fallback = "--"
) => {
  if (!value) return fallback
  return template?.replace("{value}", value) || fallback
}
