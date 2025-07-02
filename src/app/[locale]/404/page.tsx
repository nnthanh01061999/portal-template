import { Button, Result } from "antd"
import { Metadata } from "next"
import { getTranslations } from "next-intl/server"

import { routeConfig } from "@/configs/routes"
import { Link } from "@/i18n"

export const metadata: Metadata = {
  title: "Page Not Found | CMI Admin Portal",
  description: "The page you are looking for does not exist."
}

export default async function NotFoundPage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale })

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <Result
        status="404"
        title="404"
        subTitle={t("Common.error_404")}
        extra={
          <Link href={routeConfig.home}>
            <Button type="primary" className="bg-primary">
              {t("Common.home")}
            </Button>
          </Link>
        }
      />
    </div>
  )
}
