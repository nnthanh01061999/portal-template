import DateTimeFormat from "@/components/formats/date-time-format"
import DescriptionsFormat, {
  TDescriptionsFormatProps
} from "@/components/formats/descriptions-format"
import StringFormat from "@/components/formats/string-format"
import { TAudit } from "@/types"

type TAuditProps = {
  value?: TAudit
  type?: "create" | "update"
  fallback?: string
} & Omit<TDescriptionsFormatProps, "items">

function AuditFormat(props: TAuditProps) {
  const { value, fallback = "--", type = "create", ...descProps } = props

  return (
    <DescriptionsFormat
      items={[
        {
          children: (
            <StringFormat
              value={type === "create" ? value?.createdBy : value?.updatedBy}
              fallback={fallback}
            />
          )
        },
        {
          children: (
            <DateTimeFormat
              className="text-xs"
              type="secondary"
              value={type === "create" ? value?.createdAt : value?.updatedAt}
            />
          )
        }
      ]}
      {...descProps}
    />
  )
}

export default AuditFormat
