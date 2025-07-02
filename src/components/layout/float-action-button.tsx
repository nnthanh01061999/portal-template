"use client"

import { PlusOutlined } from "@ant-design/icons"
import { FloatButton } from "antd"
import { ReactNode } from "react"

interface FloatActionButtonProps {
  icon?: ReactNode
  tooltip?: string
  onClick?: () => void
  type?: "default" | "primary"
  shape?: "circle" | "square"
  children?: ReactNode
}

const FloatActionButton = ({
  icon = <PlusOutlined />,
  tooltip,
  onClick,
  type = "primary",
  shape = "circle",
  children
}: FloatActionButtonProps) => {
  return (
    <FloatButton.Group
      trigger="hover"
      type={type}
      style={{ right: 24 }}
      icon={icon}
      tooltip={tooltip}>
      {children}
      <FloatButton
        icon={icon}
        type={type}
        shape={shape}
        tooltip={tooltip}
        onClick={onClick}
      />
    </FloatButton.Group>
  )
}

export default FloatActionButton
