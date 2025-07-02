"use client"

import dynamic from "next/dynamic"

import { PageSkeleton } from "@/components/layout/page-skeleton"

const ProfilePage = dynamic(
  () => import("@/app/[locale]/(admin)/profile/pages/profile-page"),
  {
    ssr: false,
    loading: () => <PageSkeleton />
  }
)

export default ProfilePage
