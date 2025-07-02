import { Typography } from "antd"
import { TextProps } from "antd/es/typography/Text"

export type TStringFormatProps = {
  value?: string
  fallback?: string
  copyPosition?: "first" | "last"
} & TextProps

const { Text } = Typography

function StringFormat(props: TStringFormatProps) {
  const {
    value,
    fallback = "--",
    copyPosition = "last",
    copyable,
    ...textProps
  } = props

  return (
    <Text
      title={value}
      {...textProps}
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
    </Text>
  )
}

export default StringFormat
