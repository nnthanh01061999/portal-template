import { Metadata } from "next"
import { getTranslations } from "next-intl/server"

import { createMetadata } from "@/lib/metadata"

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "Dashboard" })

  return createMetadata({
    title: t("title"),
    description: "Dashboard overview with key metrics and recent user activity"
  })
}
