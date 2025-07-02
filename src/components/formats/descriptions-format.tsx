import { Space, SpaceProps, Typography } from "antd"
import { TextProps } from "antd/lib/typography/Text"
import { ReactNode, useMemo } from "react"

import { cn } from "@/lib/utils"

const { Text } = Typography

export type DescriptionsFormatItem = TextProps & {
  label?: string | ReactNode
  containerClassName?: string
  condition?: any
}

export type TDescriptionsFormatProps = SpaceProps & {
  items: DescriptionsFormatItem[]
  colon?: boolean
  valueAlign?: "start" | "end"
}

function DescriptionsFormat(props: TDescriptionsFormatProps) {
  const { items, colon = true, valueAlign = "start", ...spaceProps } = props

  const filteredItems = useMemo(
    () =>
      items?.filter((item) =>
        typeof item.condition === "boolean" ? item.condition : true
      ),
    [items]
  )

  if (!filteredItems.length) return null

  return (
    <Space
      direction="vertical"
      size={0}
      {...spaceProps}
      className={cn([
        valueAlign === "end" ? "w-full" : "",
        spaceProps.className
      ])}>
      {filteredItems.map(({ label, containerClassName, ...item }, index) => {
        delete item.condition
        return item.children ? (
          <div
            key={index}
            className={cn([
              valueAlign === "end"
                ? cn(["w-full flex", label ? "justify-between" : "justify-end"])
                : "",
              containerClassName
            ])}>
            {getLabel(label, valueAlign, colon, item)}
            {getChildren(valueAlign, item)}
          </div>
        ) : null
      })}
    </Space>
  )
}

export default DescriptionsFormat

export const getLabel = (
  label: ReactNode,
  valueAlign: "start" | "end",
  colon: boolean,
  item: DescriptionsFormatItem
) => {
  const content = (
    <>
      {label}
      <span>{colon ? `: ` : " "}</span>
    </>
  )

  if (!label) return null

  if (typeof label === "string") {
    return (
      <Text type={valueAlign === "end" ? undefined : "secondary"} {...item}>
        {content}
      </Text>
    )
  }
  return <span>{content}</span>
}

export const getChildren = (
  valueAlign: "start" | "end",
  item: DescriptionsFormatItem
) => {
  if (typeof item.children === "string")
    return (
      <Text
        {...item}
        className={cn([
          valueAlign === "end" ? "text-right" : "",
          item.className
        ])}
      />
    )
  return item.children
}
