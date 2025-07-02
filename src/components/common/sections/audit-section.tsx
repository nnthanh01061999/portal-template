import { DescriptionsProps, Typography } from "antd"
import { useTranslations } from "next-intl"
import { useMemo } from "react"

import BaseDescriptions from "@/components/formats/base-description"
import DateTimeFormat from "@/components/formats/date-time-format"
import StringFormat from "@/components/formats/string-format"
import { TAudit } from "@/types"

const { Text } = Typography

type TAuditSectionProps = {
  data?: TAudit
  fallback?: string
} & DescriptionsProps

function AuditSection(props: TAuditSectionProps) {
  const { data, fallback = "--", ...descriptionProps } = props
  const t = useTranslations()

  const items = useMemo(
    () =>
      [
        {
          label: t("Common.created_information"),
          children: (
            <Text>
              <StringFormat value={data?.createdBy} fallback={fallback} />
              <DateTimeFormat value={data?.createdAt} template="({value})" />
            </Text>
          )
        },
        {
          label: t("Common.updated_information"),
          children: (
            <Text>
              <StringFormat value={data?.updatedBy} fallback={fallback} />
              <DateTimeFormat value={data?.updatedAt} template="({value})" />
            </Text>
          )
        }
      ] satisfies DescriptionsProps["items"],
    [
      data?.createdAt,
      data?.createdBy,
      data?.updatedAt,
      data?.updatedBy,
      fallback,
      t
    ]
  )

  return <BaseDescriptions {...descriptionProps} items={items} />
}

export default AuditSection
