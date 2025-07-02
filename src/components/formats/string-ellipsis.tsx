import { Typography } from "antd"
import { EllipsisConfig } from "antd/es/typography/Base"
import { ParagraphProps } from "antd/es/typography/Paragraph"
import { useTranslations } from "next-intl"
import { ReactNode, useState } from "react"

export type TStringEllipsisProps = {
  value: ReactNode
  fallback?: string
  expandable?: boolean
  copyPosition?: "first" | "last"
} & ParagraphProps

const { Text, Paragraph } = Typography

function StringEllipsis(props: TStringEllipsisProps) {
  const {
    value,
    fallback = "--",
    expandable = true,
    copyPosition,
    copyable,
    ...textProps
  } = props
  const [expanded, setExpanded] = useState<boolean>(false)
  const t = useTranslations("Common")

  return (
    <Paragraph
      {...textProps}
      ellipsis={{
        rows: 2,
        expandable: "collapsible",
        symbol: expandable
          ? (expanded: boolean) => (expanded ? t("collapse") : t("expand"))
          : null,
        expanded,
        onExpand: (_, info) => setExpanded(info.expanded),
        ...((textProps.ellipsis as EllipsisConfig) || {})
      }}
      onClick={(e) => e.stopPropagation()}
      className="!mb-0"
      copyable={value && copyPosition === "last" ? copyable : false}>
      {value && !!copyable && copyPosition === "first" ? (
        <Text
          className="me-1"
          copyable={{
            text: value,
            ...(typeof copyable === "boolean" ? {} : (copyable as any))
          }}
        />
      ) : null}
      {value || fallback}
    </Paragraph>
  )
}

export default StringEllipsis
