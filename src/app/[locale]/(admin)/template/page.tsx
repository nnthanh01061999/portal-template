"use client"

import dynamic from "next/dynamic"

import { PageSkeleton } from "@/components/layout/page-skeleton"

const TemplateListPage = dynamic(
  () => import("@/app/[locale]/(admin)/template/pages/template-list-page"),
  {
    ssr: false,
    loading: () => <PageSkeleton />
  }
)

export default TemplateListPage
