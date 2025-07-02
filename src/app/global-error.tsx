"use client"

import { AntdRegistry } from "@ant-design/nextjs-registry"
import { Button, Result } from "antd"
import { useEffect } from "react"

export default function GlobalError({
  error,
  reset
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <html lang="en">
      <body>
        <AntdRegistry>
          <div className="flex items-center justify-center h-screen bg-gray-50">
            <Result
              status="500"
              title="500"
              subTitle="Sorry, something went wrong."
              extra={
                <Button
                  type="primary"
                  onClick={() => reset()}
                  className="bg-[#1677ff]">
                  Retry
                </Button>
              }
            />
          </div>
        </AntdRegistry>
      </body>
    </html>
  )
}
