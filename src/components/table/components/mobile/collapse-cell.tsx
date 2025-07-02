import {
  Collapse,
  CollapseProps,
  Descriptions,
  DescriptionsProps,
  Space,
  Typography
} from "antd"
import { useTranslations } from "next-intl"

import { convertColumnToDescriptionItems } from "@/components/table/utils"
import { TTableColumn } from "@/types"
import { toTitleCase } from "@/utils/format"

const { Link, Text } = Typography

type TCollapseCellProps<T> = {
  generalItems: DescriptionsProps["items"]
  descriptionProps?: DescriptionsProps
  collapseGroups: Record<string, TTableColumn<T>>
  value: T
  record: T
  index: number
}

function CollapseCell<T>(props: TCollapseCellProps<T>) {
  const { generalItems, descriptionProps, collapseGroups, ...rest } = props

  const t = useTranslations("Common")

  const isSingleGroup = Object.keys(collapseGroups)?.length === 1

  const { other, ...containGroup } = collapseGroups

  const collapseItems = Object.entries({ ...containGroup, other })
    .filter(([, groupValue]) => {
      return groupValue && groupValue.length > 0
    })
    .map(([key, groupValue]) => {
      const items = convertColumnToDescriptionItems({
        columns: groupValue,
        ...rest
      })
      return {
        key,
        label: isSingleGroup ? undefined : <Text>{toTitleCase(key)}</Text>,
        children: (
          <Descriptions
            className="[&_.ant-descriptions-view]:!border-x-0 [&_.ant-descriptions-view]:rounded-none [&_.ant-descriptions-view]:!border-t-0"
            bordered
            size="small"
            layout="horizontal"
            styles={{ label: { width: "40%" } }}
            items={items}
            column={1}
            {...descriptionProps}
          />
        )
      }
    })

  const renderExpandIcon: CollapseProps["expandIcon"] = isSingleGroup
    ? (panel) => (
        <Link className="!text-[#1677ff]">
          {panel.isActive ? t("collapse") : t("expand")}
        </Link>
      )
    : undefined

  return (
    <Space.Compact direction="vertical" className="w-full">
      <Descriptions
        className="[&_.ant-descriptions-view]:rounded-b-none bg-transparent"
        bordered
        size="small"
        layout="horizontal"
        styles={{ label: { width: "40%" } }}
        items={generalItems}
        column={1}
        {...descriptionProps}
      />
      {collapseItems.length ? (
        <div onClick={(e) => e.stopPropagation()}>
          <Collapse
            destroyOnHidden
            rootClassName={[
              "rounded-t-none bg-[none] !border-t-0 !border-[rgba(5,5,5,0.06)]",
              "[&_.ant-collapse-content]:!border-t-0",
              "[&_.ant-collapse-content-box]:!p-0",
              isSingleGroup
                ? [
                    "[&_.ant-collapse-item]:flex-col-reverse [&_.ant-collapse-item]:flex [&_.ant-collapse-header]:justify-center",
                    "[&_.ant-collapse-expand-icon]:w-full [&_.ant-collapse-expand-icon]:flex [&_.ant-collapse-expand-icon]:justify-center"
                  ].join(" ")
                : ""
            ].join(" ")}
            items={collapseItems}
            expandIconPosition={isSingleGroup ? "start" : "end"}
            expandIcon={renderExpandIcon}
          />
        </div>
      ) : null}
    </Space.Compact>
  )
}

export default CollapseCell
