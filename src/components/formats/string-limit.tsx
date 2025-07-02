import { TooltipProps, Typography } from "antd"
import { TextProps } from "antd/es/typography/Text"

import BaseTooltip from "@/components/common/tooltip/base-tooltip"

type TStringLimitProps = {
  value?: string
  fallback?: string
  limit?: number
  hideTitle?: boolean
  tooltipProps?: TooltipProps
  copyPosition?: "first" | "last"
} & TextProps

const { Text } = Typography

function StringLimit(props: TStringLimitProps) {
  const {
    value,
    fallback = "--",
    limit = 10,
    hideTitle = false,
    tooltipProps,
    copyPosition = "last",
    copyable,
    ...textProps
  } = props

  const renderCopy = () => {
    return value && !!copyable && copyPosition === "first" ? (
      <Text
        className="me-1"
        copyable={{
          text: value,
          ...(typeof copyable === "boolean" ? {} : (copyable as any))
        }}
      />
    ) : null
  }

  return value && value.length > limit ? (
    <BaseTooltip {...tooltipProps} title={!hideTitle && value}>
      <Text
        onClick={(e) => e.stopPropagation()}
        {...textProps}
        copyable={value && copyPosition === "last" ? { text: value } : false}>
        {renderCopy()}
        {(value || fallback).slice(0, limit) + " ..."}
      </Text>
    </BaseTooltip>
  ) : (
    <Text
      {...textProps}
      copyable={value && copyPosition === "last" ? copyable : false}>
      {renderCopy()}
      {value || fallback}
    </Text>
  )
}

export default StringLimit
