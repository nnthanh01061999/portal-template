import { useMemo } from "react"

import StringFormat, {
  TStringFormatProps
} from "@/components/formats/string-format"

type TStringArrayProps<T> = {
  value?: T
  keys: (keyof T)[]
  colon?: string
  fallback?: string
  copyPosition?: "first" | "last"
} & TStringFormatProps

function StringArray<T>({
  value,
  keys,
  colon = " - ",
  ...props
}: TStringArrayProps<T>) {
  const formattedValue = useMemo(() => {
    return keys.reduce((prev: string, cur, index) => {
      const curValue = value?.[cur as keyof typeof cur] as unknown as string
      const separator = index < keys.length - 1 ? colon : ""
      return curValue ? prev + `${curValue}${separator}` : prev
    }, "")
  }, [value, keys, colon])

  return <StringFormat {...props} value={formattedValue} />
}

export default StringArray
