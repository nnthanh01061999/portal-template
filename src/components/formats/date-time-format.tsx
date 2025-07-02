import dayjs from "dayjs"
import { useMemo } from "react"

import StringFormat, {
  TStringFormatProps
} from "@/components/formats/string-format"
import { DATETIME_FORMAT_DISPLAY } from "@/constants"
import { formatDateTimeTemplate } from "@/helpers/date"
import { Assign, TTemplateFormat } from "@/types"

type TDateTimeFormatProps = Assign<
  TStringFormatProps,
  {
    value?: dayjs.ConfigType
    format?: string
    template?: TTemplateFormat
  }
>

function DateTimeFormat(props: TDateTimeFormatProps) {
  const {
    value,
    format = DATETIME_FORMAT_DISPLAY,
    fallback = "--",
    template,
    ...textProps
  } = props
  const formattedValue = useMemo(() => {
    return formatDateTimeTemplate(value, format, fallback, template)
  }, [value, format, fallback, template])

  return <StringFormat {...textProps} value={formattedValue} />
}

export default DateTimeFormat
