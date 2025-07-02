import { useTranslations } from "next-intl"

import { TStringFormatProps } from "@/components/formats/string-format"
import TemplateFormat from "@/components/formats/template-format"
import { formatNumber } from "@/utils/format"

export type TTotalResultProps = {
  total: number
} & TStringFormatProps

function TotalResult(props: TTotalResultProps) {
  const { total } = props

  const t = useTranslations("Common")

  return (
    <TemplateFormat
      type="secondary"
      className="text-xs md:text-base font-medium md:font-normal"
      template="{total} {result}"
      value={{
        total: formatNumber(total),
        result:
          total > 1 ? t("results").toLowerCase() : t("result").toLowerCase()
      }}
    />
  )
}

export default TotalResult
