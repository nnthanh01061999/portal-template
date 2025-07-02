import { Switch, SwitchProps } from "antd"

import { TFormBaseProps } from "@/types/form"

type TFormSwitchProps = TFormBaseProps<SwitchProps>
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function FormSwitch({ config, formType, ...props }: TFormSwitchProps) {
  const { name, disabled } = config

  return <Switch key={name} disabled={disabled} {...props} />
}

export default FormSwitch
