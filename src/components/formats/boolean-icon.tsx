import { CheckOutlined, CloseOutlined } from "@ant-design/icons"
import { Fragment } from "react"

export interface IBooleanIconProps {
  value: boolean
  showFalse?: boolean
}

function BooleanIcon(props: IBooleanIconProps) {
  const { value, showFalse = false } = props
  const falseIcon = showFalse ? <CloseOutlined /> : null
  return <Fragment>{value ? <CheckOutlined /> : falseIcon}</Fragment>
}

export default BooleanIcon
