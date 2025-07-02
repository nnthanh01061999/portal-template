import { useMemo } from "react"

import InfiniteSelect, {
  TInfiniteSelectProps
} from "@/components/common/select/infinite-select"
import { usePlaceholder } from "@/helpers/form/hooks/use-placeholder"
import { cn } from "@/lib/utils"
import { TFormBaseProps } from "@/types/form"

type TFormInfiniteSelectProps = TFormBaseProps<TInfiniteSelectProps>
function FormInfiniteSelect({
  config,
  formType = "form",
  className,
  apiConfig = {},
  ...props
}: TFormInfiniteSelectProps) {
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
    <InfiniteSelect
      key={name}
      disabled={disabled}
      allowClear={allowClear}
      placeholder={formattedPlaceholder}
      className={cn(["w-full", className])}
      apiConfig={apiConfig as any}
      {...props}
    />
  )
}

export default FormInfiniteSelect
