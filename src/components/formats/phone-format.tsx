import { useMemo } from "react"

import StringFormat, {
  TStringFormatProps
} from "@/components/formats/string-format"
import { formatPhone } from "@/utils/format"

type TPhoneFormatProps = TStringFormatProps

function PhoneFormat({ value, ...props }: TPhoneFormatProps) {
  const formattedValue = useMemo(() => {
    return formatPhone(value)
  }, [value])

  return <StringFormat {...props} value={formattedValue} />
}

export default PhoneFormat
