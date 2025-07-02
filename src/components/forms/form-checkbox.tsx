import { Checkbox } from "antd"
import { CheckboxGroupProps } from "antd/es/checkbox"

import { TFormBaseProps } from "@/types/form"

type TFormCheckboxProps = TFormBaseProps<CheckboxGroupProps>
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function FormCheckbox({ config, formType, ...props }: TFormCheckboxProps) {
  const { name, disabled } = config

  return <Checkbox.Group key={name} disabled={disabled} {...props} />
}

export default FormCheckbox
