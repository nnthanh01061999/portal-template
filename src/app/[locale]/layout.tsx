import { Metadata } from "next"
import { hasLocale } from "next-intl"
import { getTimeZone, setRequestLocale } from "next-intl/server"
import { Geist, Geist_Mono } from "next/font/google"
import { headers } from "next/headers"
import { notFound } from "next/navigation"

import ClientProvider from "@/components/providers/client-provider"
import { routing } from "@/i18n/routing"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
})

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params

  // Load messages for the current locale for metadata
  let messages
  try {
    messages = (await import(`../../../messages/${locale}.json`)).default
  } catch {
    return {}
  }

  return {
    title: {
      template: `%s | ${messages.app?.name || "CMI Admin Portal"}`,
      default: messages.app?.name || "CMI Admin Portal"
    },
    description: messages.app?.description || "Admin portal for CMI system",
    openGraph: {
      title: messages.app?.name || "CMI Admin Portal",
      description: messages.app?.description || "Admin portal for CMI system",
      locale
    }
  }
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params
  const timeZone = await getTimeZone()

  // Get user agent from headers
  let userAgent = ""
  const headersList = await headers()
  try {
    userAgent = headersList.get("user-agent") || ""
  } catch (error) {
    console.error("Error getting headers:", error)
  }

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  // Enable static rendering
  setRequestLocale(locale)

  // Load messages for the current locale
  let messages
  try {
    messages = (await import(`../../../messages/${locale}.json`)).default
  } catch {
    notFound()
  }

  return (
    <div className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <ClientProvider
        locale={locale}
        messages={messages}
        userAgent={userAgent}
        timeZone={timeZone}>
        {children}
      </ClientProvider>
    </div>
  )
}
