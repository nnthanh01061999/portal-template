import GeneralSection from "@/app/[locale]/(admin)/profile/components/sections/general-section"
import { IUser } from "@/types"

interface GeneralTabProps {
  data?: IUser
}

const GeneralTab = ({ data }: GeneralTabProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <GeneralSection data={data} />
    </div>
  )
}

export default GeneralTab
