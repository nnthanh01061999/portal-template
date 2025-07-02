import { PlusOutlined } from "@ant-design/icons"
import { ButtonProps } from "antd"
import { useTranslations } from "next-intl"
import dynamic from "next/dynamic"
import { useCallback, useMemo } from "react"

import AuditFormat from "@/components/formats/audit-format"
import BooleanIcon from "@/components/formats/boolean-icon"
import LinkFormat from "@/components/formats/link-format"
import StringFormat from "@/components/formats/string-format"
import { useNotify } from "@/components/providers/notify-provider"
import BaseTable from "@/components/table"
import TableAction from "@/components/table/components/table-action"
import { routeConfig } from "@/configs/routes"
import { injectVariablesToPath } from "@/helpers/fetch/util"
import { useSearch } from "@/helpers/form"
import useMutationApi from "@/hooks/query/use-mutation-api"
import useQueryApi from "@/hooks/query/use-query-api"
import useExtractPagination from "@/hooks/use-extract-pagination"
import useLocaleHelper from "@/hooks/use-locale-helper"
import useOpen from "@/hooks/use-open"
import { useRouter } from "@/i18n"
import {
  TAudit,
  TResponseList,
  TTableColumn,
  TTemplate,
  TTemplateAdditionalData
} from "@/types"
import { destructData } from "@/utils/api"
import { mergeFieldToArray } from "@/utils/array"

const TemplateDrawer = dynamic(
  () => import("@/app/[locale]/(admin)/template/components/template-drawer"),
  {
    ssr: false
  }
)

function TemplateTable() {
  const { currentValues, handleTableChange } = useSearch()

  const { pagination } = useExtractPagination({
    currentValues
  })

  const t = useTranslations()
  const router = useRouter()
  const { getListTitle, getCodeTitle, getNameTitle } = useLocaleHelper()
  const { notify } = useNotify()

  const { open, id, onClose, onOpen } = useOpen<TTemplate>()

  const { data, isFetching, refetch } = useQueryApi<
    TResponseList<TTemplate, TTemplateAdditionalData>
  >("template/index", {
    params: {
      ...currentValues,
      ...pagination
    }
  })

  const { items, total, additionalData } = destructData(data)

  const { mutate: deleteTemplate, isPending: isDeleting } = useMutationApi(
    "template/delete",
    {
      onSuccess: () => {
        refetch()
        notify.success({
          message: t("Common.delete_success"),
          description: t("Common.delete_success_description")
        })
      }
    }
  )

  const mergedItems = useMemo(() => {
    return mergeFieldToArray<TTemplate, TTemplateAdditionalData>({
      items,
      mapping: [
        {
          alias: "audit.createdBy",
          items: additionalData?.accounts,
          compare: (item, data) => item.id === data.id,
          convert: (item) => item
        },
        {
          alias: "audit.updatedBy",
          items: additionalData?.accounts,
          compare: (item, data) => item.id === data.id,
          convert: (item) => item
        }
      ]
    })
  }, [additionalData?.accounts, items])

  const onView = useCallback(
    (record: TTemplate) => {
      router.push(
        injectVariablesToPath(routeConfig.template.detail, { id: record.id })
      )
    },
    [router]
  )

  const onUpdate = useCallback(
    (record: TTemplate) => {
      onOpen({
        id: record.id
      })
    },
    [onOpen]
  )

  const onDelete = useCallback(
    (record: TTemplate) => {
      deleteTemplate({
        pathVariables: {
          id: record.id
        }
      })
    },
    [deleteTemplate]
  )

  const columns = useMemo(
    () =>
      [
        {
          key: "id",
          dataIndex: "id",
          title: t("Common.id"),
          width: 60,
          cellGroup: "id-action",
          render: (value) => (
            <LinkFormat
              value={value}
              link={{
                href: injectVariablesToPath(routeConfig.template.detail, {
                  id: value
                })
              }}
            />
          )
        },
        {
          key: "code",
          dataIndex: "code",
          title: getCodeTitle("Template.title"),
          width: 160,
          render: (value) => <StringFormat value={value} />
        },
        {
          title: getNameTitle("Template.title"),
          dataIndex: "name",
          key: "name",
          width: 160,
          render: (value) => <StringFormat value={value} />
        },
        {
          key: "isActive",
          dataIndex: "isActive",
          title: t("Common.status"),
          align: "center",
          width: 100,
          render: (value: boolean) => <BooleanIcon value={value} />
        },
        {
          key: "created_information",
          title: t("Common.created_information"),
          dataIndex: "audit",
          width: 160,
          collapse: true,
          render: (value: TAudit) => <AuditFormat value={value} />
        },
        {
          key: "updated_information",
          dataIndex: "audit",
          title: t("Common.updated_information"),
          width: 160,
          collapse: true,
          render: (value: TAudit) => <AuditFormat value={value} type="update" />
        },
        {
          key: "action",
          title: t("Common.action"),
          width: 100,
          fixed: "right",
          cellGroup: "id-action",
          render: (record) => (
            <TableAction
              record={record}
              onView={onView}
              onUpdate={onUpdate}
              onDelete={onDelete}
              isDeleting={isDeleting}
            />
          )
        }
      ] satisfies TTableColumn<TTemplate>,
    [getCodeTitle, getNameTitle, isDeleting, onDelete, onUpdate, onView, t]
  )

  const actionItems = useMemo(() => {
    return [
      {
        type: "primary",
        icon: <PlusOutlined />,
        children: t("Common.create"),
        onClick: () => onOpen()
      },
      {
        type: "primary",
        icon: <PlusOutlined />,
        children: t("Common.create"),
        onClick: () => onOpen()
      }
    ] satisfies ButtonProps[]
  }, [onOpen, t])

  return (
    <>
      <BaseTable
        rowKey="id"
        headerProps={{
          name: getListTitle("Template.title"),
          actionItems
        }}
        loading={isFetching}
        columns={columns}
        dataSource={mergedItems}
        onChange={handleTableChange({})}
        pagination={{
          total,
          current: pagination.index,
          pageSize: pagination.limit
        }}
      />
      <TemplateDrawer
        id={id}
        open={open}
        onSuccess={refetch}
        onClose={onClose}
      />
    </>
  )
}

export default TemplateTable
