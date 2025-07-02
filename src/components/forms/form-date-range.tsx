import { DatePicker } from "antd"
import { RangePickerProps } from "antd/es/date-picker"

import { cn } from "@/lib/utils"
import { TFormBaseProps } from "@/types/form"

const { RangePicker } = DatePicker

type TFormDateRangeProps = TFormBaseProps<RangePickerProps>
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function FormDateRange({ config, formType, ...props }: TFormDateRangeProps) {
  const { name, disabled, allowClear, format } = config

  return (
    <RangePicker
      key={name}
      disabled={disabled}
      allowClear={allowClear}
      format={format}
      className={cn(["w-full", props.className])}
      {...props}
    />
  )
}

export default FormDateRange
