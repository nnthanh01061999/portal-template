import { useMemo } from "react"

import StringFormat, {
  TStringFormatProps
} from "@/components/formats/string-format"
import { Assign, TTemplateFormat } from "@/types"
import { formatPriceTemplate } from "@/utils/format"

type TPriceFormatProps = Assign<
  TStringFormatProps,
  {
    value?: number
    unit?: string
    options?: Intl.NumberFormatOptions
    template?: TTemplateFormat
  }
>

function PriceFormat(props: TPriceFormatProps) {
  const {
    value,
    template,
    fallback = "--",
    unit = "đ",
    options = { maximumFractionDigits: 2 }
  } = props

  const formattedValue = useMemo(() => {
    return formatPriceTemplate({ value, fallback, unit, options, template })
  }, [value, fallback, unit, options, template])

  return <StringFormat {...props} value={formattedValue} />
}

export default PriceFormat
