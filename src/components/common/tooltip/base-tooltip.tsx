import { Tooltip } from "antd"
import { TooltipPropsWithOverlay } from "antd/es/tooltip"

const BaseTooltip = (props: TooltipPropsWithOverlay) => {
  const { children, color = "rgba(11, 167, 229, 0.85)", ...rest } = props
  return (
    <Tooltip color={color} {...rest}>
      <span>{children}</span>
    </Tooltip>
  )
}

export default BaseTooltip
