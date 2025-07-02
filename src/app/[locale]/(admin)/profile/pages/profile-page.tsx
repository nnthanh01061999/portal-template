import { useTranslations } from "next-intl"

import ChangePasswordTab from "@/app/[locale]/(admin)/profile/components/tabs/change-password-tab"
import GeneralTab from "@/app/[locale]/(admin)/profile/components/tabs/general-tab"
import PageWrapper from "@/components/layout/page-wrapper"
import { routeConfig } from "@/configs/routes"
import useCurrentTab from "@/hooks/use-current-tab"
import { useRouter } from "@/i18n"
import { useAuthStore } from "@/stores/stores/auth"
import { getStringFormat } from "@/utils/format"

function ProfilePage() {
  const router = useRouter()
  const t = useTranslations()
  const user = useAuthStore.use.user?.()

  const { tabs, activeTab, onTabChange } = useCurrentTab({
    tabs: [
      {
        key: "general",
        label: t("Common.general")
      },
      {
        key: "change-password",
        label: t("Auth.change_password")
      }
    ]
  })

  return (
    <PageWrapper
      breadcrumb={{
        items: [
          {
            title: t("Common.home"),
            href: routeConfig.home
          },
          {
            title: t("Auth.profile"),
            href: routeConfig.auth.profile
          },
          {
            title: getStringFormat(user, "{name} - {code}"),
            href: routeConfig.auth.profile
          }
        ]
      }}
      title={getStringFormat(user, "{name} - {code}")}
      tabList={tabs}
      tabActiveKey={activeTab}
      onTabChange={onTabChange}
      onBack={router.back}>
      {activeTab === "general" && <GeneralTab data={user} />}
      {activeTab === "change-password" && <ChangePasswordTab />}
    </PageWrapper>
  )
}

export default ProfilePage
