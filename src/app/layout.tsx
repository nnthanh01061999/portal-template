import { AntdRegistry } from "@ant-design/nextjs-registry"
import { Metadata, Viewport } from "next"

import { APP_URL } from "@/constants/env"

import "./globals.css"

export const metadata: Metadata = {
  title: {
    template: "%s | CMI Admin Portal",
    default: "CMI Admin Portal"
  },
  description: "Admin portal for CMI system",
  applicationName: "CMI Admin Portal",
  authors: [{ name: "CMI Team" }],
  generator: "Next.js",
  keywords: ["admin", "portal", "dashboard", "management", "CMI"],
  creator: "CMI Team",
  publisher: "CMI",
  formatDetection: {
    telephone: false
  },
  metadataBase: new URL(APP_URL),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "CMI Admin Portal",
    title: "CMI Admin Portal",
    description: "Admin portal for CMI system"
  },
  twitter: {
    card: "summary_large_image",
    title: "CMI Admin Portal",
    description: "Admin portal for CMI system"
  },
  robots: {
    index: false,
    follow: false
  },
  manifest: "/manifest.json"
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#111111" }
  ]
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <body suppressHydrationWarning>
        <AntdRegistry>{children}</AntdRegistry>
      </body>
    </html>
  )
}
