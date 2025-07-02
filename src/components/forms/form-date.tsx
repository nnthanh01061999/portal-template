import { DatePicker, DatePickerProps } from "antd"
import { useMemo } from "react"

import { usePlaceholder } from "@/helpers/form/hooks/use-placeholder"
import { cn } from "@/lib/utils"
import { TFormBaseProps } from "@/types/form"

type TFormDateProps = TFormBaseProps<DatePickerProps>
function FormDate({ config, formType = "form", ...props }: TFormDateProps) {
  const {
    name,
    disabled,
    componentType,
    placeholder,
    allowClear,
    format,
    label
  } = config
  const { getPlaceholder } = usePlaceholder(formType)

  const formattedPlaceholder = useMemo(() => {
    return getPlaceholder({
      label,
      componentType,
      placeholder
    })
  }, [getPlaceholder, label, componentType, placeholder])

  return (
    <DatePicker
      key={name}
      disabled={disabled}
      allowClear={allowClear}
      placeholder={formattedPlaceholder}
      format={format}
      className={cn(["w-full", props.className])}
      {...props}
    />
  )
}

export default FormDate
