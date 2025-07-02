import { useQueryClient } from "@tanstack/react-query"
import { Button, Card, Form, SelectProps } from "antd"
import { useTranslations } from "next-intl"
import { useEffect, useMemo } from "react"

import TranslationInput from "@/components/common/translation-input"
import FormContent from "@/components/forms/form-content"
import { useNotify } from "@/components/providers/notify-provider"
import { USER_TYPE_OPTIONS } from "@/constants"
import { useColSpan, useDefaultRules, usePlaceholder } from "@/helpers/form"
import useMutationApi from "@/hooks/query/use-mutation-api"
import { IUser, TFormItemConfig, TProfileFormValues } from "@/types"
import { toTitleCase } from "@/utils/format"

const initialValues: TProfileFormValues = {
  name: "",
  code: "",
  isActive: true,
  userType: "",
  isAdmin: false,
  translation: {
    name: {}
  }
}

const GeneralSection = ({ data }: { data?: IUser }) => {
  const [form] = Form.useForm()
  const t = useTranslations()
  const { notify } = useNotify()
  const { getRequiredRule } = useDefaultRules()
  const { getPlaceholder } = usePlaceholder()
  const queryClient = useQueryClient()

  const { mutate: updateProfile, isPending: isCreating } = useMutationApi(
    "authorization/me/account/update",
    {
      onSuccess: () => {
        notify.success({
          description: toTitleCase(
            t("Common.action_success", {
              action: t("Auth.change_password")
            })
          )
        })
        form.resetFields()
        queryClient.invalidateQueries({
          queryKey: ["authorization/me/account"]
        })
      }
    }
  )

  const onFinish = (values: TProfileFormValues) => {
    updateProfile({
      name: values.name,
      translation: values.translation
    })
  }

  const colSpan = useColSpan(1)

  const formFields: TFormItemConfig<TProfileFormValues>[] = useMemo(() => {
    const formFields: TFormItemConfig<TProfileFormValues>[] = [
      {
        name: "name",
        label: t("Common.name"),
        componentType: "INPUT",
        rules: getRequiredRule("Common.name", "input"),
        children: (
          <TranslationInput
            translationsProps={{ name: "name" }}
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
        disabled: true
      },
      {
        name: "userType",
        label: t("Auth.user_type"),
        componentType: "SELECT",
        disabled: true,
        childrenProps: {
          options: USER_TYPE_OPTIONS
        } satisfies SelectProps
      },
      {
        name: "isActive",
        label: t("Common.active"),
        disabled: true,
        componentType: "SWITCH",
        colSpan: 12
      },
      {
        name: "isAdmin",
        label: t("Auth.is_admin"),
        disabled: true,
        componentType: "SWITCH",
        colSpan: 12
      }
    ]
    return formFields.map((field) => ({
      colSpan,
      ...field
    }))
  }, [t, getRequiredRule, getPlaceholder, colSpan])

  useEffect(() => {
    if (data) {
      form.setFieldsValue(data)
    }
  }, [data, form])

  return (
    <Card
      title={t("Common.general_information")}
      extra={
        <Button type="primary" onClick={form.submit} loading={isCreating}>
          {t("Common.save")}
        </Button>
      }>
      <Form
        form={form}
        layout="vertical"
        initialValues={initialValues}
        onFinish={onFinish}>
        <FormContent fields={formFields} />
      </Form>
    </Card>
  )
}

export default GeneralSection
