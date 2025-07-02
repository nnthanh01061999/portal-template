import { Radio, RadioProps } from "antd"

import { TFormBaseProps } from "@/types/form"

type TFormRadioProps = TFormBaseProps<RadioProps>
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function FormRadio({ config, formType, ...props }: TFormRadioProps) {
  const { name, disabled } = config

  return <Radio.Group key={name} disabled={disabled} {...props} />
}

export default FormRadio
