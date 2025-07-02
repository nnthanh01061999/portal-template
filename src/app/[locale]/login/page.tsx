"use client"

import dynamic from "next/dynamic"

import { PageSkeleton } from "@/components/layout/page-skeleton"

const LoginPage = dynamic(
  () => import("@/app/[locale]/login/pages/login-page"),
  {
    ssr: false,
    loading: () => <PageSkeleton />
  }
)

export default LoginPage
