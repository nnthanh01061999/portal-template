import { DescriptionsProps } from "antd"
import { useTranslations } from "next-intl"
import { useMemo } from "react"

import BaseDescriptions from "@/components/formats/base-description"
import BooleanTag from "@/components/formats/boolean-tag"
import StringFormat from "@/components/formats/string-format"
import { TTemplate } from "@/types"

type TGeneralSectionProps = {
  data?: TTemplate
}
function GeneralSection(props: TGeneralSectionProps) {
  const { data } = props
  const t = useTranslations()

  const items = useMemo(
    () =>
      [
        {
          label: t("Common.code"),
          children: <StringFormat value={data?.code} />
        },
        {
          label: t("Common.name"),
          children: <StringFormat value={data?.name} />
        },
        {
          label: t("Common.status"),
          children: <BooleanTag value={data?.isActive} activeLabel />
        }
      ] satisfies DescriptionsProps["items"],
    [data?.code, data?.isActive, data?.name, t]
  )

  return <BaseDescriptions items={items} />
}

export default GeneralSection
