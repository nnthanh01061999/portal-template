import {
  DownOutlined,
  FilterOutlined,
  SearchOutlined,
  SyncOutlined,
  UpOutlined
} from "@ant-design/icons"
import {
  Button,
  Col,
  Collapse,
  Drawer,
  DrawerProps,
  Form,
  FormInstance,
  FormProps,
  Row,
  RowProps
} from "antd"
import { useTranslations } from "next-intl"
import { useCallback, useEffect, useMemo, useState } from "react"

import { MODAL_WIDTH } from "@/constants"
import { useColSpan } from "@/helpers/form/hooks/use-col-span"
import { renderFormItems } from "@/helpers/form/index"
import useOpen from "@/hooks/use-open"
import { useResponsive } from "@/hooks/use-responsive"
import { cn } from "@/lib/utils"
import { TFormItemConfig } from "@/types/form"
import { cleanObject } from "@/utils/object"

type TSearchFormProps<F extends object> = {
  fields: TFormItemConfig<F>[]
  advancedFields?: TFormItemConfig[]
  onSubmit: (values: Record<string, any>) => void
  onClear: () => void
  values?: Record<string, any>
  disabled?: boolean
  loading?: boolean
  formRef?: FormInstance<any>
  formProps?: FormProps
  drawerMode?: boolean
  rowJustify?: RowProps["justify"]
}

function SearchForm<F extends object>(props: TSearchFormProps<F>) {
  const {
    fields: _fields = [],
    advancedFields: _advancedFields = [],
    onSubmit,
    onClear,
    values,
    disabled,
    loading,
    drawerMode,
    formRef,
    formProps,
    rowJustify = "end"
  } = props

  const { isMobile } = useResponsive()

  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false)
  const t = useTranslations("Form")

  const [formBase] = Form.useForm()
  const form = useMemo(() => formRef || formBase, [formRef, formBase])

  const { open, onOpen, onClose } = useOpen()

  const fieldColSpan = useColSpan(3)

  const isDrawerMode = drawerMode || isMobile

  const fields = useMemo(() => {
    return _fields.map((field) => ({
      className: "mb-2",
      ...field,
      colSpan: isDrawerMode ? 24 : field.colSpan || fieldColSpan
    }))
  }, [_fields, fieldColSpan, isDrawerMode])

  const advancedFields = useMemo(() => {
    return _advancedFields.map((field) => ({
      className: "mb-2",
      ...field,
      colSpan: isDrawerMode ? 24 : field.colSpan || fieldColSpan
    }))
  }, [_advancedFields, fieldColSpan, isDrawerMode])

  const totalFilteredFields = useMemo(
    () => getTotalFilteredFields(values, fields, advancedFields),
    [values, fields, advancedFields]
  )

  const handleSubmit = useCallback(
    (values: Record<string, any>) => {
      const cleanValues = cleanObject(values)
      onSubmit(cleanValues)
      onClose()
    },
    [onSubmit, onClose]
  )

  const handleClear = useCallback(() => {
    form.resetFields()
    onClear()
  }, [form, onClear])

  useEffect(() => {
    form.setFieldsValue(values)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values])

  const renderActions = useCallback(() => {
    return (
      <div
        className={cn([
          "flex justify-end items-center gap-3",
          isDrawerMode ? "w-full flex-wrap" : "flex-nowrap"
        ])}>
        {advancedFields.length ? (
          <Button
            type="link"
            onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
            icon={showAdvancedSearch ? <UpOutlined /> : <DownOutlined />}
            iconPosition="end">
            {t("advance_search")}
          </Button>
        ) : null}
        <div
          className={cn([
            "flex gap-3 w-full",
            isDrawerMode && "w-full [&>*]:flex-1"
          ])}>
          <Button
            onClick={handleClear}
            disabled={disabled}
            icon={<SyncOutlined />}>
            {t("reset")}
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            onClick={form.submit}
            loading={loading}
            disabled={disabled}
            icon={<SearchOutlined />}>
            {t("search")}
          </Button>
        </div>
      </div>
    )
  }, [
    isDrawerMode,
    advancedFields.length,
    showAdvancedSearch,
    t,
    handleClear,
    disabled,
    form.submit,
    loading
  ])

  const renderForm = useCallback(() => {
    return (
      <Form
        form={form}
        onFinish={handleSubmit}
        disabled={disabled}
        labelAlign="left"
        labelWrap
        layout={isDrawerMode ? "vertical" : "horizontal"}
        {...formProps}>
        <Row gutter={16} justify={rowJustify}>
          {renderFormItems(fields as any, "search")}
          {advancedFields?.length ? (
            <Col span={24} className="mt-2">
              <Collapse
                activeKey={showAdvancedSearch ? ["advanced"] : undefined}
                bordered={false}
                className="bg-none w-full [&_.ant-collapse-header]:hidden [&_.ant-collapse-content-box]:p-0"
                items={[
                  {
                    key: "advanced",
                    label: t("advance_search"),
                    children: (
                      <Row gutter={16} justify={rowJustify}>
                        {renderFormItems(advancedFields, "search")}
                      </Row>
                    )
                  }
                ]}
              />
            </Col>
          ) : null}
          <Col span="flex-1" className="self-center mt-2">
            {isDrawerMode ? null : renderActions()}
          </Col>
        </Row>
      </Form>
    )
  }, [
    form,
    handleSubmit,
    disabled,
    formProps,
    rowJustify,
    fields,
    advancedFields,
    showAdvancedSearch,
    t,
    isDrawerMode,
    renderActions
  ])

  return isDrawerMode ? (
    <>
      <div className="flex justify-end gap-3">
        <Button
          type="link"
          className="px-0"
          onClick={() => onOpen()}
          icon={<FilterOutlined />}>
          {t("filters")}
          {totalFilteredFields > 0 ? ` (${totalFilteredFields})` : ""}
        </Button>
      </div>
      <SearchMobileDrawer
        open={open}
        onClose={onClose}
        footer={renderActions()}>
        {renderForm()}
      </SearchMobileDrawer>
    </>
  ) : (
    renderForm()
  )
}

export default SearchForm

const SearchMobileDrawer = (props: DrawerProps) => {
  const t = useTranslations("Form")
  return (
    <Drawer
      placement="right"
      title={t("filters")}
      classNames={{
        body: "!overflow-x-hidden "
      }}
      width={MODAL_WIDTH.xs}
      closable={true}
      destroyOnHidden={true}
      {...props}>
      {props.children}
    </Drawer>
  )
}

const getTotalFilteredFields = (
  values: Record<string, any> = {},
  fields: TFormItemConfig<any>[] = [],
  advancedFields: TFormItemConfig<any>[] = []
) => {
  const keyMap = Object.entries(values)
    .filter(([, value]) => value !== undefined && value !== null)
    .reduce(
      (prev, [cur]) => {
        let formattedKey = cur
        ;["_gte", "_gt", "_lte", "_lt", "from_", "to_"].forEach((key) => {
          formattedKey = formattedKey.replace(key, "")
        })
        return { ...prev, [formattedKey]: true }
      },
      {} as Record<string, boolean>
    )

  const totalFields = [...fields, ...advancedFields].reduce((prev, cur) => {
    const value = keyMap[cur.name]
    return prev + (value ? 1 : 0)
  }, 0)

  return totalFields
}
