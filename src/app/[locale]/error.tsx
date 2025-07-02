"use client"

import { Button, Result } from "antd"
import { useTranslations } from "next-intl"
import { useEffect } from "react"

import { useRouter } from "@/i18n"

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const t = useTranslations()
  const router = useRouter()

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <Result
        status="500"
        title="500"
        subTitle={t("Common.error_500")}
        extra={
          <div className="flex gap-4">
            <Button onClick={() => reset()}>{t("Common.retry")}</Button>
            <Button
              type="primary"
              onClick={() => router.push("/")}
              className="bg-primary">
              {t("Common.home")}
            </Button>
          </div>
        }
      />
    </div>
  )
}
