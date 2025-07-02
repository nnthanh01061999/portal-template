export function isNumber(value?: any): value is number {
  return typeof value === "number" && !isNaN(value)
}

export function get(obj?: any, path?: string, defaultValue?: any): any {
  if (!obj || !path) return defaultValue
  return path.split(".").reduce((acc, key) => acc?.[key], obj) ?? defaultValue
}

export function isArray(value?: any): value is any[] {
  return Array.isArray(value)
}

export function isEmpty(value?: any): boolean {
  if (value == null) return true
  if (Array.isArray(value) || typeof value === "string")
    return value.length === 0
  if (typeof value === "object") return Object.keys(value).length === 0
  return false
}

export function uniq<T>(array?: T[]): T[] {
  return array ? [...new Set(array)] : []
}

export function groupBy<T>(array?: T[], key?: keyof T): Record<string, T[]> {
  if (!array || !key) return {}
  return array.reduce(
    (acc, item) => {
      const groupKey = item[key] as unknown as string
      ;(acc[groupKey] = acc[groupKey] || []).push(item)
      return acc
    },
    {} as Record<string, T[]>
  )
}

export function size(value?: any): number {
  if (!value) return 0
  if (Array.isArray(value) || typeof value === "string") return value.length
  if (typeof value === "object") return Object.keys(value).length
  return 0
}

export function debounce<F extends (...args: any[]) => void>(
  func?: F,
  wait?: number
): (...args: Parameters<F>) => void {
  let timeout: NodeJS.Timeout
  return function (...args: Parameters<F>) {
    if (!func || wait == null) return
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

export function set(obj?: any, path?: string, value?: any): void {
  if (!obj || !path) return
  const keys = path.split(".")
  let current = obj
  keys.forEach((key, index) => {
    if (index === keys.length - 1) {
      current[key] = value
    } else {
      current = current[key] = current[key] || {}
    }
  })
}
