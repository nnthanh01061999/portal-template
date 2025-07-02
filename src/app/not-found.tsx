import { redirect } from "next/navigation"

import { routing } from "@/i18n/routing"

export default function RootNotFound() {
  // Redirect to the default locale's not-found page
  redirect(`/${routing.defaultLocale}/404`)
}
