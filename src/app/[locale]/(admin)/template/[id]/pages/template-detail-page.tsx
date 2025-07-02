import { useTranslations } from "next-intl"
import { useParams } from "next/navigation"

import GeneralTab from "@/components/common/tabs/general-tab"
import PageWrapper from "@/components/layout/page-wrapper"
import { routeConfig } from "@/configs/routes"
import useQueryApi from "@/hooks/query/use-query-api"
import useCurrentTab from "@/hooks/use-current-tab"
import useLocaleHelper from "@/hooks/use-locale-helper"
import { useRouter } from "@/i18n"
import { TResponseList, TTemplate } from "@/types"
import { destructDetailData } from "@/utils/api"

function TemplateDetailPage() {
  const { id = "" } = useParams()

  const router = useRouter()
  const t = useTranslations()
  const { getDetailTitle } = useLocaleHelper()

  const { tabs, activeTab, onTabChange } = useCurrentTab({
    tabs: [
      {
        key: "general",
        label: t("Common.general")
      }
    ]
  })

  const { data, isFetching } = useQueryApi<TResponseList<TTemplate>>(
    "template/search/get",
    {
      params: {
        filter: {
          ids: {
            include: id ? [id] : undefined
          }
        }
      },
      enabled: !!id
    }
  )

  const { item } = destructDetailData(data)

  return (
    <PageWrapper
      breadcrumb={{
        items: [
          {
            title: t("Common.home"),
            href: routeConfig.home
          },
          {
            title: t("Template.title"),
            href: routeConfig.template.list
          },
          {
            title: t("Common.item_detail", { name: t("Template.title") })
          }
        ]
      }}
      title={getDetailTitle("Template.title")}
      loading={isFetching}
      tabList={tabs}
      tabActiveKey={activeTab}
      onTabChange={onTabChange}
      onBack={router.back}>
      {activeTab === "general" && <GeneralTab data={item} />}
    </PageWrapper>
  )
}

export default TemplateDetailPage
