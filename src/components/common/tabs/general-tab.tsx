import { Card } from "antd/lib"
import { useTranslations } from "next-intl"

import AuditSection from "@/components/common/sections/audit-section"
import GeneralSection from "@/components/common/sections/general-section"
import { TTemplate } from "@/types"

interface GeneralTabProps {
  data?: TTemplate
}

const GeneralTab = ({ data }: GeneralTabProps) => {
  const t = useTranslations("Common")
  return (
    <div className="flex flex-col gap-4">
      <Card title={t("general_information")}>
        <GeneralSection data={data} />
      </Card>
      <Card title={t("modification_information")}>
        <AuditSection data={data?.audit} />
      </Card>
    </div>
  )
}

export default GeneralTab
