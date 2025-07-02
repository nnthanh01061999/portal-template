"use client"

import dynamic from "next/dynamic"

import { PageSkeleton } from "@/components/layout/page-skeleton"

const DashboardPage = dynamic(
  () => import("@/app/[locale]/(admin)/dashboard/pages/dashboard-page"),
  {
    ssr: false,
    loading: () => <PageSkeleton />
  }
)

export default DashboardPage
