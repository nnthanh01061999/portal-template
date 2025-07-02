import { Col, Form } from "antd"

import FormCheckbox from "@/components/forms/form-checkbox"
import FormDate from "@/components/forms/form-date"
import FormDateRange from "@/components/forms/form-date-range"
import FormInfiniteSelect from "@/components/forms/form-infinite-select"
import FormInput from "@/components/forms/form-input"
import FormInputNumber from "@/components/forms/form-input-number"
import FormRadio from "@/components/forms/form-radio"
import FormSelect from "@/components/forms/form-select"
import FormSwitch from "@/components/forms/form-switch"
import FormTextArea from "@/components/forms/form-textarea"
import FormTime from "@/components/forms/form-time"
import { valuePropsName } from "@/helpers/form/value-props-name"
import {
  TFormChildProps,
  TFormComponentType,
  TFormItemConfig,
  TFormType
} from "@/types/form"

const formItemFactory = {
  INPUT: FormInput,
  TEXTAREA: FormTextArea,
  NUMBER: FormInputNumber,
  SELECT: FormSelect,
  INFINITE_SELECT: FormInfiniteSelect,
  DATE: FormDate,
  DATE_RANGE: FormDateRange,
  TIME: FormTime,
  CHECKBOX: FormCheckbox,
  RADIO: FormRadio,
  SWITCH: FormSwitch
} satisfies Record<
  TFormComponentType,
  React.ComponentType<{ config: TFormChildProps<object> }>
>

export const renderFormType = <F extends object = object, T = unknown>({
  childrenProps,
  formType,
  ...config
}: TFormItemConfig<F, T> & { formType: TFormType }) => {
  const Component = formItemFactory[config.componentType]
  return (
    <Component
      config={config as TFormItemConfig}
      formType={formType}
      {...childrenProps}
    />
  )
}

export const renderFormItems = (
  items: TFormItemConfig<any>[],
  formType: TFormType = "form"
) => {
  return items.map((item) => {
    const {
      //col
      colSpan,
      offset,
      colClassName,
      //item
      name,
      label,
      placeholder,
      disabled,
      allowClear,
      className,
      componentType,
      fieldType,
      //children
      childrenProps,
      children,
      ...itemProps
    } = item

    const propsName = valuePropsName[componentType]

    return (
      <Col key={name} span={colSpan} offset={offset} className={colClassName}>
        <Form.Item
          name={name}
          label={label}
          valuePropName={propsName}
          className={className}
          {...itemProps}>
          {children
            ? children
            : renderFormType<any, any>({
                name,
                label,
                placeholder,
                disabled,
                allowClear,
                componentType,
                fieldType,
                formType,
                childrenProps
              })}
        </Form.Item>
      </Col>
    )
  })
}

export { formParserStrategy } from "./parser"

export { formConvertStrategy } from "./convert"

export { useColSpan } from "./hooks/use-col-span"
export { useDefaultRules } from "./hooks/use-default-rules"
export { usePlaceholder } from "./hooks/use-placeholder"
export { useSearch } from "./hooks/use-search"
