import { Button, ButtonProps, Menu, Typography } from "antd"
import { memo, useCallback, useMemo } from "react"

import TotalResult from "@/components/table/components/total-result"
import { convertButtonsToMenuItems } from "@/components/table/utils"
import { useResponsive } from "@/hooks/use-responsive"
import { cn } from "@/lib/utils"

const { Title } = Typography

export type TTableHeaderProps = {
  name?: string
  total?: number
  actionItems?: ButtonProps[]
  renderName?: () => React.ReactNode
  renderAction?: () => React.ReactNode
  renderTotal?: () => React.ReactNode
  className?: string
  menuMode?: boolean
}

function TableHeader({
  name,
  total,
  actionItems = [],
  renderName,
  renderAction,
  renderTotal,
  className,
  menuMode = false
}: TTableHeaderProps) {
  const { isMobile } = useResponsive()

  const showMenu = useMemo(() => {
    return menuMode && actionItems?.length > 1 && !isMobile
  }, [menuMode, actionItems, isMobile])

  const renderNameContent = useCallback(() => {
    if (renderName) return renderName()
    if (!name) return null
    return (
      <Title level={5} className="mb-0">
        {name}
      </Title>
    )
  }, [name, renderName])

  const renderTotalContent = useCallback(() => {
    if (renderTotal) return renderTotal()
    if (total && total > 0) {
      return <TotalResult total={total} />
    }
    return null
  }, [renderTotal, total])

  const renderActionContent = useCallback(() => {
    if (renderAction) return renderAction()
    if (actionItems?.length > 0) {
      if (!showMenu) {
        return (
          <div className="flex items-center gap-2">
            {actionItems.map((item, index) => (
              <Button key={index} {...item} />
            ))}
          </div>
        )
      }
      return (
        <Menu
          className="font-normal bg-transparent"
          mode="horizontal"
          items={convertButtonsToMenuItems(actionItems)}
        />
      )
    }
    return null
  }, [renderAction, actionItems, showMenu])

  const shouldRenderHeader = useMemo(() => {
    return (
      !!name ||
      !!total ||
      !!actionItems?.length ||
      !!renderName ||
      !!renderAction ||
      !!renderTotal
    )
  }, [name, renderAction, renderName, renderTotal, total, actionItems])

  if (!shouldRenderHeader) return null

  return (
    <div
      className={cn(["flex justify-between items-center w-full", className])}>
      <div className="flex items-bottom flex-col">
        {renderNameContent()}
        {renderTotalContent()}
      </div>
      <div>{renderActionContent()}</div>
    </div>
  )
}

export default memo(TableHeader)
