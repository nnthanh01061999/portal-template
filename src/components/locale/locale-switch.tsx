"use client"

import { GlobalOutlined } from "@ant-design/icons"
import { Button, Dropdown } from "antd"
import type { MenuProps } from "antd"
import { useLocale } from "next-intl"
import React from "react"

import { usePathname, useRouter } from "@/i18n/navigation"
import { routing } from "@/i18n/routing"

export function LocaleSwitch({ style }: { style?: React.CSSProperties }) {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const locales = routing.locales

  const handleLocaleChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale })
  }

  const localeLabels: Record<string, string> = {
    en: "English",
    vi: "Tiếng Việt"
  }

  const items: MenuProps["items"] = locales.map((l: string) => ({
    key: l,
    label: (
      <span className={l === locale ? "font-medium" : ""}>
        {localeLabels[l]}
      </span>
    ),
    onClick: () => handleLocaleChange(l)
  }))

  return (
    <Dropdown menu={{ items }} placement="bottomRight">
      <Button
        icon={<GlobalOutlined style={style} />}
        shape="circle"
        type="text"
        size="large"
      />
    </Dropdown>
  )
}
