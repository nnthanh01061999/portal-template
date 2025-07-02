import { Metadata } from "next"
import { getTranslations } from "next-intl/server"

import { createMetadata } from "@/lib/metadata"

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "app" })

  return createMetadata({
    title: t("name"),
    description: t("description")
  })
}
