"use client"

import { LockOutlined, UserOutlined } from "@ant-design/icons"
import {
  Button,
  Card,
  Checkbox,
  Form,
  Input,
  InputProps,
  Row,
  Typography
} from "antd"
import { Building } from "lucide-react"
import { useTranslations } from "next-intl"
import { useMemo } from "react"

import FloatAction from "@/components/layout/float-action"
import { useNotify } from "@/components/providers/notify-provider"
import { USER_TYPE_OPTIONS } from "@/constants"
import {
  renderFormItems,
  useColSpan,
  useDefaultRules,
  usePlaceholder
} from "@/helpers/form"
import useMutationApi from "@/hooks/query/use-mutation-api"
import { useRouter } from "@/i18n"
import { useAuthStore } from "@/stores/stores/auth"
import { ILoginFormValues, ILoginResponse, TFormItemConfig } from "@/types"
import { TResponseDetail } from "@/types/api"

const { Title, Text } = Typography

export default function LoginPage() {
  const t = useTranslations("Login")
  const router = useRouter()
  const [form] = Form.useForm<ILoginFormValues>()
  const { notify } = useNotify()

  const userType = useAuthStore.use.userType()

  const login = useAuthStore.use.login()
  const { getRequiredRule } = useDefaultRules()
  const { getPlaceholder } = usePlaceholder()
  const colSpan = useColSpan(1)

  const { mutate: loginUser, isPending } = useMutationApi<
    { clientId: string; clientSecret: string },
    TResponseDetail<ILoginResponse>
  >("authentication/sign-in", {
    onSuccess: (data) => {
      login({
        ...data.data,
        userType: form.getFieldValue("userType")
      })
      router.push("/dashboard")
      notify.success({
        description: t("login_success")
      })
    },
    onError: (error: any) => {
      notify.error({
        description: error.message || t("login_failed")
      })
    }
  })

  const handleLogin = (values: ILoginFormValues) => {
    loginUser({
      pathVariables: { user_type: values.userType },
      clientId: values.clientId,
      clientSecret: values.clientSecret
    })
  }

  const formFields = useMemo(
    () =>
      [
        {
          name: "userType",
          componentType: "SELECT",
          rules: getRequiredRule("Login.user_type", "select"),
          colSpan,
          childrenProps: {
            prefix: <Building size={16} />,
            options: USER_TYPE_OPTIONS
          }
        },
        {
          name: "clientId",
          componentType: "INPUT",
          placeholder: t("username"),
          rules: getRequiredRule("Login.username", "input"),
          colSpan,
          childrenProps: {
            prefix: <UserOutlined />
          } satisfies InputProps
        },
        {
          name: "clientSecret",
          componentType: "INPUT",
          placeholder: t("password"),
          rules: getRequiredRule("Login.password", "input"),
          colSpan,
          children: (
            <Input.Password
              prefix={<LockOutlined />}
              placeholder={getPlaceholder({ label: "Login.password" })}
            />
          )
        }
      ] satisfies TFormItemConfig<ILoginFormValues>[],
    [colSpan, getPlaceholder, getRequiredRule, t]
  )

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <div className="mb-8 text-center">
          <Title level={2} className="mb-2">
            {t("welcome_back")}
          </Title>
          <Text className="text-gray-500">{t("login_to_continue")}</Text>
        </div>

        <Form
          form={form}
          name="login"
          initialValues={{
            remember: true,
            userType,
            clientId: "admin@example.com",
            clientSecret: "password"
          }}
          onFinish={handleLogin}
          layout="vertical"
          size="large">
          <Row gutter={16}>{renderFormItems(formFields)}</Row>

          <div className="mb-4 flex items-center justify-between">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>{t("remember_me")}</Checkbox>
            </Form.Item>
            <Button type="link" className="p-0">
              {t("forgot_password")}
            </Button>
          </div>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full"
              loading={isPending}>
              {t("sign_in")}
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <FloatAction />
    </div>
  )
}
