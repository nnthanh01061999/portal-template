"use client"

import dynamic from "next/dynamic"

import { PageSkeleton } from "@/components/layout/page-skeleton"

const AdminLayout = dynamic(() => import("@/components/layout/admin-layout"), {
  ssr: false,
  loading: () => <PageSkeleton />
})

export default function AdminPageLayout({
  children
}: {
  children: React.ReactNode
}) {
  return <AdminLayout>{children}</AdminLayout>
}
