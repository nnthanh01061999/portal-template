import { Button, Drawer, Form, ModalProps, SelectProps } from "antd"
import { useTranslations } from "next-intl"
import { useEffect, useMemo } from "react"

import TranslationInput from "@/components/common/translation-input"
import FormContent from "@/components/forms/form-content"
import { useNotify } from "@/components/providers/notify-provider"
import { MODAL_WIDTH } from "@/constants"
import { useColSpan, useDefaultRules, usePlaceholder } from "@/helpers/form"
import useMutationApi from "@/hooks/query/use-mutation-api"
import useQueryApi from "@/hooks/query/use-query-api"
import useLocaleHelper from "@/hooks/use-locale-helper"
import {
  TFormItemConfig,
  TResponseList,
  TTemplate,
  TTemplateFormValues
} from "@/types"
import { destructData } from "@/utils/api"
import { withModal } from "@/utils/with-modal"

export interface ITemplateDrawerProps extends ModalProps {
  open: boolean
  id?: number | string
  onClose: () => void
  onSuccess: () => void
}

const initialValues: TTemplateFormValues = {
  name: "",
  code: "",
  isActive: true,
  translation: {
    name: {}
  }
}

const BaseTemplateDrawer = ({
  open,
  id,
  onSuccess,
  onClose
}: ITemplateDrawerProps) => {
  const isCreateMode = !id

  const [form] = Form.useForm<TTemplateFormValues>()
  const t = useTranslations()
  const { notify } = useNotify()
  const { getActiveOptions, getActionTitle } = useLocaleHelper()
  const { getRequiredRule } = useDefaultRules()
  const { getPlaceholder } = usePlaceholder()

  const { data, isFetching } = useQueryApi<TResponseList<TTemplate>>(
    "template/search/get",
    {
      params: {
        filter: {
          ids: {
            include: id ? [id] : undefined
          }
        }
      },
      enabled: !!open && !isCreateMode
    }
  )

  const { items } = destructData(data)
  const detailItem = items[0]

  const { mutate: createTemplate, isPending: isCreating } = useMutationApi(
    "template/create",
    {
      onSuccess: () => {
        notify.success({
          description: t("Common.create_successfully_message", {
            name: t("Template.title")
          })
        })
        onClose()
        onSuccess()
      }
    }
  )

  const { mutate: updateTemplate, isPending: isUpdating } = useMutationApi(
    "template/update",
    {
      pathVariables: {
        id
      },
      onSuccess: () => {
        notify.success({
          description: t("Common.update_successfully_message", {
            name: t("Template.title")
          })
        })
        onClose()
        onSuccess()
      }
    }
  )

  const onFinish = (values: TTemplateFormValues) => {
    if (isCreateMode) {
      createTemplate(values)
    } else {
      updateTemplate(values)
    }
  }

  const colSpan = useColSpan(1)

  const formFields: TFormItemConfig<TTemplateFormValues>[] = useMemo(() => {
    const formFields: TFormItemConfig<TTemplateFormValues>[] = [
      {
        name: "name",
        label: t("Common.name"),
        componentType: "INPUT",
        rules: getRequiredRule("Common.name", "input"),
        children: (
          <TranslationInput
            translationsProps={{ name: "translation.name" }}
            placeholder={getPlaceholder({
              label: t("Common.name"),
              componentType: "INPUT"
            })}
          />
        )
      },
      {
        name: "code",
        label: t("Common.code"),
        componentType: "INPUT",
        rules: getRequiredRule("Common.code", "input"),
        disabled: !isCreateMode
      },
      {
        name: "isActive",
        label: t("Common.status"),
        componentType: "SELECT",
        childrenProps: {
          options: getActiveOptions()
        } satisfies SelectProps
      }
    ]
    return formFields.map((field) => ({
      colSpan,
      ...field
    }))
  }, [
    t,
    getRequiredRule,
    getPlaceholder,
    isCreateMode,
    getActiveOptions,
    colSpan
  ])

  useEffect(() => {
    if (open && detailItem) {
      form.setFieldsValue(detailItem)
    } else {
      form.resetFields()
    }
  }, [open, form, detailItem])

  return (
    <Drawer
      title={getActionTitle(
        "Template.title",
        isCreateMode ? "create" : "update"
      )}
      open={open}
      onClose={onClose}
      width={MODAL_WIDTH.sm}
      extra={
        <Button
          type="primary"
          onClick={form.submit}
          loading={isFetching || isCreating || isUpdating}>
          {t("Common.save")}
        </Button>
      }
      loading={isFetching}>
      <Form
        form={form}
        layout="vertical"
        initialValues={initialValues}
        onFinish={onFinish}>
        <FormContent fields={formFields} />
      </Form>
    </Drawer>
  )
}

const TemplateDrawer = withModal(BaseTemplateDrawer)

export default TemplateDrawer
