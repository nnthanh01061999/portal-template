import { redirect } from "next/navigation"

import { defaultLocale } from "@/i18n"

export default function Home() {
  redirect(`/${defaultLocale}`)

  // This part will never be reached
  return null
}
