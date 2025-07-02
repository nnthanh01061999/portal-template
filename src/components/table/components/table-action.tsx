import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons"
import { Button, ButtonProps, Space } from "antd"
import { useTranslations } from "next-intl"
import { ReactNode } from "react"

import { useNotify } from "@/components/providers/notify-provider"

export type TTableActionProps<T> = {
  record: T
  onUpdate?: (record: T) => void
  onDelete?: (record: T) => void
  onView?: (record: T) => void
  prefix?: ReactNode
  suffix?: ReactNode
  isDeleting?: boolean
  isUpdating?: boolean
  isViewing?: boolean
  viewProps?: ButtonProps
  updateProps?: ButtonProps
  deleteProps?: ButtonProps
}

const TableAction = <T,>({
  record,
  prefix,
  suffix,
  onUpdate,
  onDelete,
  onView,
  viewProps,
  updateProps,
  deleteProps,
  isDeleting,
  isUpdating,
  isViewing
}: TTableActionProps<T>) => {
  const t = useTranslations()
  const { confirm } = useNotify()

  const handleDelete = () => {
    confirm.confirmYesNo({
      title: t("Common.delete_record"),
      content: t("Common.delete_record_confirm"),
      icon: <DeleteOutlined className="text-[#FF4D4F]" size={20} />,
      type: "warning",
      className: "[&_.ant-modal-confirm-title]:text-[#FF4D4F]",
      closable: true,
      okButtonProps: {
        danger: true
      },
      onOk: () => onDelete?.(record)
    })
  }

  return (
    <Space size={0}>
      {prefix}
      {onView && (
        <Button
          name={t("Common.view_detail")}
          title={t("Common.view_detail")}
          type="link"
          icon={<EyeOutlined />}
          {...viewProps}
          loading={isViewing}
          onClick={() => onView(record)}
        />
      )}
      {onUpdate && (
        <Button
          name={t("Common.edit")}
          title={t("Common.edit")}
          type="link"
          icon={<EditOutlined />}
          {...updateProps}
          loading={isUpdating}
          onClick={() => onUpdate(record)}
        />
      )}
      {onDelete && (
        <Button
          name={t("Common.delete")}
          title={t("Common.delete")}
          type="link"
          danger
          icon={<DeleteOutlined className="text-[#FF4D4F]" size={20} />}
          {...deleteProps}
          loading={isDeleting}
          onClick={handleDelete}
        />
      )}
      {suffix}
    </Space>
  )
}

export default TableAction
