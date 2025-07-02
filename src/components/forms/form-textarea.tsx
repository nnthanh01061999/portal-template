import { Input } from "antd"
import { TextAreaProps } from "antd/es/input"
import { useMemo } from "react"

import { usePlaceholder } from "@/helpers/form/hooks/use-placeholder"
import { TFormBaseProps } from "@/types/form"

const { TextArea } = Input

type TFormTextAreaProps = TFormBaseProps<TextAreaProps>

function FormTextArea({
  config,
  formType = "form",
  ...props
}: TFormTextAreaProps) {
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
    <TextArea
      key={name}
      disabled={disabled}
      allowClear={allowClear}
      placeholder={formattedPlaceholder}
      {...props}
    />
  )
}

export default FormTextArea
