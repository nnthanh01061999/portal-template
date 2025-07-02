import { Metadata } from "next"
import { getTranslations } from "next-intl/server"

import { createMetadata } from "@/lib/metadata"

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "Login" })

  return createMetadata({
    title: t("welcome_back"),
    description: t("login_to_continue"),
    noIndex: true
  })
}
