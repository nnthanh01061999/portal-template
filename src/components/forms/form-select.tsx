import { Select, SelectProps } from "antd"
import { useMemo } from "react"

import { usePlaceholder } from "@/helpers/form/hooks/use-placeholder"
import { cn } from "@/lib/utils"
import { TFormBaseProps } from "@/types/form"

type TFormSelectProps = TFormBaseProps<SelectProps>
function FormSelect({
  config,
  formType = "form",
  className,
  ...props
}: TFormSelectProps) {
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
    <Select
      key={name}
      disabled={disabled}
      allowClear={allowClear}
      placeholder={formattedPlaceholder}
      className={cn(["w-full", className])}
      {...props}
    />
  )
}

export default FormSelect
