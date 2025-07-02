import { Row, RowProps } from "antd"

import { renderFormItems } from "@/helpers/form"
import { TFormItemConfig } from "@/types/form"

type TFormContentProps<T extends object> = RowProps & {
  fields: TFormItemConfig<T>[]
}
function FormContent<T extends object>({
  fields,
  ...props
}: TFormContentProps<T>) {
  return (
    <Row gutter={16} {...props}>
      {renderFormItems(fields)}
    </Row>
  )
}

export default FormContent
