import { Tag, TagProps } from "antd"
import { useTranslations } from "next-intl"

type TBooleanTagProps = {
  value?: boolean | number
  labelTrue?: string
  labelFalse?: string
  colorTrue?: string
  colorFalse?: string
  activeLabel?: boolean
  fallback?: string
} & TagProps

function BooleanTag({
  value,
  activeLabel,
  colorTrue = "success",
  colorFalse = "error",
  fallback = "--",
  ...props
}: TBooleanTagProps) {
  const t = useTranslations()
  const labelFalse = activeLabel ? t("Common.inactive") : t("Common.no")
  const labelTrue = activeLabel ? t("Common.active") : t("Common.yes")
  if (typeof value === "undefined") return fallback
  const color = value ? colorTrue : colorFalse
  const label = value ? labelTrue : labelFalse
  return (
    <div className="flex items-center justify-center">
      <Tag {...props} color={color}>
        {label}
      </Tag>
    </div>
  )
}

export default BooleanTag
