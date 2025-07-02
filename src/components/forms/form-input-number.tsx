import { InputNumber, InputNumberProps } from "antd"
import { useMemo } from "react"

import { usePlaceholder } from "@/helpers/form/hooks/use-placeholder"
import { cn } from "@/lib/utils"
import { TFormBaseProps } from "@/types/form"
import { formatNumber, parseNumber } from "@/utils/format"

type TFormInputNumberProps = TFormBaseProps<InputNumberProps>
function FormInputNumber({
  config,
  formType = "form",
  ...props
}: TFormInputNumberProps) {
  const { name, disabled, componentType, placeholder, label } = config
  const { getPlaceholder } = usePlaceholder(formType)

  const formattedPlaceholder = useMemo(() => {
    return getPlaceholder({
      label,
      componentType,
      placeholder
    })
  }, [getPlaceholder, label, componentType, placeholder])

  return (
    <InputNumber
      key={name}
      disabled={disabled}
      placeholder={formattedPlaceholder}
      formatter={(value) => {
        return formatNumber((value as number) || 0)
      }}
      parser={(value) => {
        return parseNumber(value || "")
      }}
      className={cn(["w-full", props.className])}
      {...props}
    />
  )
}

export default FormInputNumber
