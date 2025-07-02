"use client"

import dynamic from "next/dynamic"

import { PageSkeleton } from "@/components/layout/page-skeleton"

const TemplateDetailPage = dynamic(
  () =>
    import("@/app/[locale]/(admin)/template/[id]/pages/template-detail-page"),
  {
    ssr: false,
    loading: () => <PageSkeleton />
  }
)

export default TemplateDetailPage
