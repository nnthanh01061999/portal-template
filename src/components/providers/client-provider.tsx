"use client"

import AntdProvider from "@/components/providers/antd-provider"
import AuthProvider from "@/components/providers/auth-provider"
// import FirebaseProvider from "@/components/providers/firebase-provider"
import HydrationProvider from "@/components/providers/hydration-provider"
import NotifyProvider from "@/components/providers/notify-provider"
import { QueryClientProvider } from "@/lib/react-query"

import "@ant-design/v5-patch-for-react-19"

import { NextIntlClientProvider } from "next-intl"

type TClientProviderProps = {
  children: React.ReactNode
  locale: React.ComponentPropsWithoutRef<
    typeof NextIntlClientProvider
  >["locale"]
  messages: React.ComponentPropsWithoutRef<
    typeof NextIntlClientProvider
  >["messages"]
  userAgent: React.ComponentPropsWithoutRef<
    typeof HydrationProvider
  >["userAgent"]
  timeZone: React.ComponentPropsWithoutRef<
    typeof NextIntlClientProvider
  >["timeZone"]
  devTools?: boolean
}

export default function ClientProvider({
  children,
  locale,
  messages,
  userAgent,
  timeZone,
  devTools = true
}: TClientProviderProps) {
  return (
    <NextIntlClientProvider
      locale={locale}
      messages={messages}
      timeZone={timeZone}>
      <HydrationProvider userAgent={userAgent}>
        <QueryClientProvider devTools={devTools}>
          <AntdProvider>
            <NotifyProvider>
              {/* <FirebaseProvider> */}
              <AuthProvider>{children}</AuthProvider>
              {/* </FirebaseProvider> */}
            </NotifyProvider>
          </AntdProvider>
        </QueryClientProvider>
      </HydrationProvider>
    </NextIntlClientProvider>
  )
}
