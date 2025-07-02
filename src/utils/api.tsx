import { ProLayoutProps } from "@ant-design/pro-layout"
import { DynamicIcon } from "lucide-react/dynamic"

import { TMenu } from "@/configs/menus"
import { TAdditionalData, TBaseModel, TResponseList } from "@/types"

export const destructData = <T, R extends TAdditionalData>(
  data?: TResponseList<T, R>
) => {
  const { items = [], total = 0, additionalData } = data?.data || {}

  return {
    items,
    total,
    additionalData
  }
}

export const getAuditInfo = (data: TBaseModel) => {
  return `${data.name}${data.code ? ` - (${data.code})` : ""}`
}

export const destructDetailData = <T, R extends TAdditionalData>(
  data?: TResponseList<T, R>
) => {
  const { items = [], additionalData } = data?.data || {}

  return {
    item: items[0],
    additionalData
  }
}

export const getMenuTrees = (
  data: TMenu[] = []
): NonNullable<ProLayoutProps["route"]>["routes"][number] => {
  return data?.map((item) => ({
    path: item?.path,
    name: item?.name,
    icon: item?.icon ? (
      <DynamicIcon name={item?.menu?.icon as unknown as any} />
    ) : null,
    children: item?.children ? getMenuTrees(item.children) : undefined
  }))
}
