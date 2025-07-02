import { TabsProps } from "antd"
import { useEffect, useState } from "react"

import { useSearch } from "@/helpers/form"

function useCurrentTab({
  tabs,
  tabKey = "tab"
}: {
  tabs: NonNullable<TabsProps["items"]>
  tabKey?: string
}) {
  const { currentValues, setParams } = useSearch()

  const [activeTab, setActiveTab] = useState<string>(
    tabs.find((tab) => tab.key === currentValues?.[tabKey])?.key || "general"
  )

  const onTabChange = (activeKey: string) => {
    setActiveTab(activeKey)
    setParams({
      data: {
        [tabKey]: activeKey
      }
    })
  }

  useEffect(() => {
    setActiveTab(
      tabs.find((tab) => tab.key === currentValues?.[tabKey])?.key || "general"
    )
  }, [currentValues, tabKey, tabs])

  return {
    tabs,
    activeTab,
    setActiveTab,
    onTabChange
  }
}

export default useCurrentTab
