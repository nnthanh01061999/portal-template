import { Descriptions, DescriptionsProps } from "antd"

import { useResponsive } from "@/hooks/use-responsive"

export type TBaseDescriptionsProps = DescriptionsProps & {
  colSpan?: number
}
function BaseDescriptions({
  layout = "horizontal",
  colSpan = 2,
  ...props
}: TBaseDescriptionsProps) {
  const { isMobile } = useResponsive()
  return (
    <Descriptions
      bordered={isMobile}
      column={{ xs: 1, md: colSpan, xl: colSpan }}
      {...props}
      layout={!isMobile ? layout : "horizontal"}
      styles={{
        ...props.styles,
        label: {
          ...props.styles?.label,
          width: layout === "horizontal" && isMobile ? "50%" : undefined
        }
      }}
    />
  )
}

export default BaseDescriptions
