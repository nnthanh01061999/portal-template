import { useMemo } from "react"

import StringFormat, {
  TStringFormatProps
} from "@/components/formats/string-format"
import { Assign, TTemplateFormat } from "@/types"
import { formatNumberTemplate } from "@/utils/format"

type TNumberFormatProps = Assign<
  TStringFormatProps,
  { value?: number; template?: TTemplateFormat }
>

function NumberFormat({
  value,
  fallback = "--",
  template,
  ...props
}: TNumberFormatProps) {
  const formattedValue = useMemo(() => {
    return formatNumberTemplate({ value, fallback, template })
  }, [value, fallback, template])

  return <StringFormat {...props} value={formattedValue} fallback={fallback} />
}

export default NumberFormat
