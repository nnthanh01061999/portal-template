import { Button, ButtonProps } from "antd"

import BaseTooltip from "@/components/common/tooltip/base-tooltip"

function TooltipButton({ name, ...props }: ButtonProps) {
  return (
    <BaseTooltip title={name}>
      <Button name={name} {...props} />
    </BaseTooltip>
  )
}

export default TooltipButton
