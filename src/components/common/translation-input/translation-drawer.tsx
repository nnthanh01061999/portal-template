import { Button, Drawer, Form, ModalProps, Row } from "antd"
import { useTranslations } from "next-intl"
import { useEffect, useMemo } from "react"

import { MODAL_WIDTH } from "@/constants"
import { useColSpan } from "@/helpers/form/hooks/use-col-span"
import { renderFormItems } from "@/helpers/form/index"
import {
  TFormItemConfig,
  TTemplateFormValues,
  TTranslation,
  TTranslationModel
} from "@/types"
import { withModal } from "@/utils/with-modal"

const LANGUAGES = ["vi", "en", "ja", "ko"]

const initialValues: TTranslationModel = LANGUAGES.reduce((acc, lang) => {
  acc[lang] = ""
  return acc
}, {} as TTranslationModel)

export interface ITranslationDrawerProps extends ModalProps {
  open: boolean
  name: string
  value?: TTranslationModel
  onChange?: (value: TTranslationModel | TTranslation) => void
  onClose: () => void
}

const BaseTranslationDrawer = ({
  open,
  name,
  value,
  onChange,
  onClose
}: ITranslationDrawerProps) => {
  const [form] = Form.useForm()
  const t = useTranslations()

  const onFinish = (values: TTranslationModel) => {
    if (name.includes(".")) {
      const [parent, child] = name.split(".")
      onChange?.({ [parent]: { [child]: values } } as unknown as TTranslation)
    } else {
      onChange?.(values)
    }
    onClose()
  }

  const colSpan = useColSpan(1)

  const formFields: TFormItemConfig<TTemplateFormValues>[] = useMemo(() => {
    const formFields: TFormItemConfig<TTranslationModel>[] = LANGUAGES.map(
      (lang) => ({
        name: lang,
        label: t(`Common.language_${lang}`),
        componentType: "INPUT"
      })
    )

    return formFields.map((field) => ({
      colSpan,
      ...field
    }))
  }, [colSpan, t])

  useEffect(() => {
    if (open && value) {
      form.setFieldsValue(value)
    } else {
      form.setFieldsValue(initialValues)
    }
  }, [open, form, value])

  return (
    <Drawer
      title={t("Common.language")}
      open={open}
      onClose={onClose}
      width={MODAL_WIDTH.sm}
      extra={
        <Button type="primary" onClick={form.submit}>
          {t("Common.save")}
        </Button>
      }>
      <Form
        form={form}
        layout="vertical"
        initialValues={initialValues}
        onFinish={onFinish}>
        <Row gutter={16}>{renderFormItems(formFields)}</Row>
      </Form>
    </Drawer>
  )
}

const TranslationDrawer = withModal(BaseTranslationDrawer)

export default TranslationDrawer
