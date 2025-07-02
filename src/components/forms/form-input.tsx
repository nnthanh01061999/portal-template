import { Input, InputProps } from "antd"
import { useMemo } from "react"

import { usePlaceholder } from "@/helpers/form/hooks/use-placeholder"
import { TFormBaseProps } from "@/types/form"

type TFormInputProps = TFormBaseProps<InputProps>
function FormInput({ config, formType = "form", ...props }: TFormInputProps) {
  const { name, disabled, componentType, placeholder, allowClear, label } =
    config
  const { getPlaceholder } = usePlaceholder(formType)

  const formattedPlaceholder = useMemo(() => {
    return getPlaceholder({
      label,
      componentType,
      placeholder
    })
  }, [getPlaceholder, label, componentType, placeholder])

  return (
    <Input
      key={name}
      disabled={disabled}
      allowClear={allowClear}
      placeholder={formattedPlaceholder}
      {...props}
    />
  )
}

export default FormInput
