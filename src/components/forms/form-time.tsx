import { DatePicker, TimePickerProps } from "antd"

import { TFormBaseProps } from "@/types/form"

const { TimePicker } = DatePicker

type TFormTimeProps = TFormBaseProps<TimePickerProps>
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function FormTime({ config, formType, ...props }: TFormTimeProps) {
  const { name, allowClear, format } = config

  return (
    <TimePicker key={name} allowClear={allowClear} format={format} {...props} />
  )
}

export default FormTime
