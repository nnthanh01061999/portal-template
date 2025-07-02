import { Button, Card, Form, FormRule, Input } from "antd"
import { useTranslations } from "next-intl"
import { useMemo } from "react"

import FormContent from "@/components/forms/form-content"
import { useNotify } from "@/components/providers/notify-provider"
import { useColSpan, useDefaultRules } from "@/helpers/form"
import useMutationApi from "@/hooks/query/use-mutation-api"
import { getLogout } from "@/stores/stores/auth"
import { TChangePasswordFormValues, TFormItemConfig } from "@/types"
import { toTitleCase } from "@/utils/format"

const initialValues: TChangePasswordFormValues = {
  oldPassword: "",
  newPassword: "",
  confirmPassword: ""
}

const ChangePasswordSection = () => {
  const [form] = Form.useForm()
  const t = useTranslations()
  const { notify } = useNotify()
  const { getRequiredRule } = useDefaultRules()
  const logout = getLogout()

  const { mutate: changePassword, isPending: isCreating } = useMutationApi(
    "authorization/me/account/password",
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
        logout()
      }
    }
  )

  const onFinish = (values: TChangePasswordFormValues) => {
    changePassword(values)
  }

  const colSpan = useColSpan(1)

  const formFields: TFormItemConfig<TChangePasswordFormValues>[] =
    useMemo(() => {
      const formFields: TFormItemConfig<TChangePasswordFormValues>[] = [
        {
          name: "oldPassword",
          label: t("Common.name"),
          componentType: "INPUT",
          rules: getRequiredRule("Auth.old_password", "input"),
          children: <Input.Password placeholder={t("Auth.old_password")} />
        },
        {
          name: "newPassword",
          label: t("Auth.new_password"),
          componentType: "INPUT",
          rules: getRequiredRule("Auth.new_password", "input"),
          children: <Input.Password placeholder={t("Auth.new_password")} />
        },
        {
          name: "confirmPassword",
          label: t("Auth.confirm_password"),
          componentType: "INPUT",
          rules: [
            ...getRequiredRule("Auth.confirm_password", "input"),
            {
              validator: (_, value) => {
                if (value !== form.getFieldValue("newPassword")) {
                  return Promise.reject(
                    new Error(t("Auth.confirm_password_not_match"))
                  )
                }
                return Promise.resolve()
              }
            }
          ] satisfies FormRule[],
          children: <Input.Password placeholder={t("Auth.confirm_password")} />
        }
      ]
      return formFields.map((field) => ({
        colSpan,
        ...field
      }))
    }, [t, getRequiredRule, form, colSpan])

  return (
    <Card
      title={t("Auth.change_password")}
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

export default ChangePasswordSection
