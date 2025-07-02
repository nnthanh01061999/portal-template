import { ButtonProps, Descriptions, DescriptionsProps } from "antd"
import { ReactNode } from "react"

import CollapseCell from "@/components/table/components/mobile/collapse-cell"
import MobileRowCell from "@/components/table/components/mobile/row-cell"
import MobileRowCellGroup from "@/components/table/components/mobile/row-cell-group"
import TableHeader from "@/components/table/components/table-header"
import useResponsiveColumn from "@/components/table/hooks/use-responsive-column"
import {
  MenuItem,
  TResponsiveColumnProps,
  TTableColumn,
  TTableColumnType,
  TTree
} from "@/types"
import { groupBy, isNumber } from "@/utils/lodash"

type TMobileColumn<T extends TTree> = ReturnType<
  typeof useResponsiveColumn<T>
>["mobileColumn"]

export const renderColumnTitle =
  <T extends TTree>(mobileColumn: TMobileColumn<T>) =>
  // eslint-disable-next-line react/display-name
  (checkboxNode: ReactNode) => {
    return (
      <div className="flex justify-between gap-2">
        {checkboxNode}
        <div className="overflow-hidden">
          {mobileColumn?.title as ReactNode}
        </div>
      </div>
    )
  }

export const renderCell =
  <T extends TTree>(mobileColumn: TMobileColumn<T>) =>
  // eslint-disable-next-line react/display-name
  <V, R>(_: V, record: R, index: number, originNode: ReactNode) => {
    return (
      <div className="flex justify-start flex-col gap-1">
        {originNode}
        {mobileColumn?.render?.(record, record as any, index) as ReactNode}
      </div>
    )
  }

export const convertButtonToMenuItem = (
  buttonProps: ButtonProps,
  key: string
): MenuItem => {
  return {
    key,
    label: buttonProps.children,
    icon: buttonProps.icon,
    disabled: buttonProps.disabled,
    onClick: () => buttonProps.onClick?.({} as any)
  }
}

export const convertButtonsToMenuItems = (
  buttonPropsList: ButtonProps[] = []
): MenuItem[] => {
  return buttonPropsList.map((buttonProps, index) =>
    convertButtonToMenuItem(buttonProps, `menu-item-${index}`)
  )
}

const sortColumns = <T,>(columns: TTableColumn<T>) => {
  const sortFunc = (a: TTableColumnType<T>, b: TTableColumnType<T>) =>
    a.responsiveOrder! - b.responsiveOrder!
  return columns?.sort(sortFunc)
}

const sortCell = <T,>(cells: TTableColumnType<T>[]) => {
  const sortFunc = (a: TTableColumnType<T>, b: TTableColumnType<T>) =>
    a.cellOrder! - b.cellOrder!
  return cells.sort(sortFunc)
}

export const convertColumnToDescriptionItems = <T,>({
  columns,
  ...props
}: {
  columns: TTableColumn<T>
  value: T
  record: T
  index: number
}) => {
  const visibleColumns = columns?.filter((item) => !item.hideOnResponsive)
  const orderedColumns = sortColumns(visibleColumns)
  const cellGroup = groupBy(orderedColumns, "cellGroup")

  return Object.entries(cellGroup).reduce(
    (prev, [key, cells], index): NonNullable<DescriptionsProps["items"]> => {
      const sortedCells = cells.length > 1 ? sortCell(cells) : cells
      const mainCell: any = sortedCells[0]

      const getChildrenComponent = () => {
        if (mainCell.children)
          return <MobileRowCellGroup columns={mainCell.children} {...props} />

        if (cells.length > 1)
          return (
            <div className="flex items-center justify-between gap-2 flex-wrap">
              {sortedCells.map((cell) => (
                <MobileRowCell key={cell.key} column={cell} {...props} />
              ))}
            </div>
          )
        return <MobileRowCell column={mainCell} {...props} />
      }

      return [
        ...prev,
        {
          key: key + index,
          label: mainCell.title,
          children: getChildrenComponent(),
          ...mainCell.responsiveProps
        }
      ]
    },
    [] as NonNullable<DescriptionsProps["items"]>
  )
}

export const responsiveColumns = <T extends TTree>(
  props: TResponsiveColumnProps<T>
) => {
  const { columns, descriptionProps, enabled = true, headerProps } = props
  if (!enabled) return columns
  const desktopColumns: TTableColumn<T> = columns.map((column, index) => {
    const defaultCollapseName =
      typeof column.collapse === "boolean" && !column.collapse
        ? "general"
        : "other"
    const cellGroup = column.cellGroup || column.key || column.dataIndex
    const responsiveOrder = isNumber(column.responsiveOrder)
      ? column.responsiveOrder
      : index + 1
    return {
      ...column,
      responsiveOrder,
      collapse:
        typeof column.collapse === "string"
          ? column.collapse
          : defaultCollapseName,
      cellGroup: cellGroup as string,
      responsive: ["sm"]
    }
  })

  const renderMobileContent: TTableColumnType<T>["render"] = (
    value: T,
    record,
    index
  ) => {
    const { general, ...collapseGroups } = groupBy(desktopColumns, "collapse")

    const generalItems = convertColumnToDescriptionItems({
      columns: general,
      value,
      record,
      index
    })

    const renderDescription = () => {
      if (generalItems?.length && generalItems.length < desktopColumns.length) {
        return (
          <CollapseCell
            generalItems={generalItems}
            descriptionProps={descriptionProps}
            collapseGroups={collapseGroups}
            index={index}
            record={record}
            value={value}
          />
        )
      }

      return (
        <Descriptions
          bordered
          size="small"
          layout="horizontal"
          styles={{ label: { width: "40%" } }}
          items={convertColumnToDescriptionItems({
            columns: desktopColumns,
            value,
            record,
            index
          })}
          column={1}
          {...descriptionProps}
        />
      )
    }

    return <div className="mobile-column">{renderDescription()}</div>
  }

  const mobileColumn: TTableColumnType<T> = {
    key: "mobile_column",
    render: renderMobileContent,
    responsive: ["xs"],
    title: <TableHeader {...headerProps} />
  }

  return [mobileColumn, ...desktopColumns]
}
