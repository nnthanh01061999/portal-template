import { Tag, TagProps } from "antd"
import { useMemo } from "react"

import { Assign, TTemplateFormat } from "@/types"
import { getStringFormatPure } from "@/utils/format"

type TNumberFormatProps = Assign<
  TagProps,
  { value?: string; fallback?: string; template?: TTemplateFormat }
>

function NumberFormat({
  value,
  fallback = "--",
  template,
  ...props
}: TNumberFormatProps) {
  const formattedValue = useMemo(() => {
    return getStringFormatPure(template, value, fallback)
  }, [value, fallback, template])

  return <Tag {...props}>{formattedValue}</Tag>
}

export default NumberFormat
