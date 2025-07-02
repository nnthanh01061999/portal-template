"use client"

import { ProConfigProvider } from "@ant-design/pro-components"
import { ConfigProvider } from "antd"
import enUS from "antd/locale/en_US"
import viVN from "antd/locale/vi_VN"
import { useLocale } from "next-intl"
import React from "react"

import themeConfig from "@/theme/themeConfig"

const localeMap = {
  en: enUS,
  vi: viVN
}

interface AntdProviderProps {
  children: React.ReactNode
}

const AntdProvider: React.FC<AntdProviderProps> = ({ children }) => {
  // Get the current locale from next-intl
  const locale = useLocale()

  // Get the corresponding Ant Design locale or fallback to English
  const antdLocale = localeMap[locale as keyof typeof localeMap] || enUS

  return (
    <ConfigProvider locale={antdLocale} theme={themeConfig}>
      <ProConfigProvider hashed={false} valueTypeMap={{}}>
        {children}
      </ProConfigProvider>
    </ConfigProvider>
  )
}

export default AntdProvider
