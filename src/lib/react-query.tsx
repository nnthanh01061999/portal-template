"use client"

import {
  QueryClient,
  QueryClientProvider as TanstackQueryClientProvider
} from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { useState, type ReactNode } from "react"

export function QueryClientProvider({
  children,
  initialIsOpen = false,
  devTools = true
}: {
  children: ReactNode
  initialIsOpen?: boolean
  devTools?: boolean
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
            refetchOnWindowFocus: false,
            retry: 1
          }
        }
      })
  )

  return (
    <TanstackQueryClientProvider client={queryClient}>
      {children}
      {devTools && (
        <ReactQueryDevtools
          initialIsOpen={initialIsOpen}
          position="left"
          buttonPosition="bottom-left"
        />
      )}
    </TanstackQueryClientProvider>
  )
}
