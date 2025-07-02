import { NextRequest, NextResponse } from "next/server"

import { mockTemplates } from "@/app/api/sample/template/utils"
import { TFilterParams } from "@/types/api"

// Helper function to filter templates based on search params
function filterTemplates(params: TFilterParams) {
  let filteredTemplates = [...mockTemplates]

  // Apply keyword filter
  if (params.filter?.keyword) {
    const keyword = params.filter.keyword.toLowerCase()
    filteredTemplates = filteredTemplates.filter(
      (template) =>
        template.name.toLowerCase().includes(keyword) ||
        template.code.toLowerCase().includes(keyword)
    )
  }

  // Apply isActive filter
  if (params.filter?.isActive !== undefined) {
    filteredTemplates = filteredTemplates.filter(
      (template) => template.isActive === params.filter?.isActive
    )
  }

  // Apply pagination
  if (params.pagination) {
    const { index, limit } = params.pagination
    const startIndex = (index - 1) * limit
    const endIndex = startIndex + limit
    filteredTemplates = filteredTemplates.slice(startIndex, endIndex)
  }

  return filteredTemplates
}

// GET /api/template/search - Search templates with query params
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams

  // Parse search parameters
  const params: TFilterParams = {
    pagination:
      searchParams.has("index") && searchParams.has("limit")
        ? {
            index: parseInt(searchParams.get("index") || "1"),
            limit: parseInt(searchParams.get("limit") || "10"),
            total: mockTemplates.length,
            refresh: false
          }
        : undefined,
    filter: {
      keyword: searchParams.get("keyword") || undefined,
      isActive: searchParams.has("isActive")
        ? searchParams.get("isActive") === "true"
        : undefined
    }
  }

  const filteredTemplates = filterTemplates(params)

  return NextResponse.json({
    data: {
      items: filteredTemplates,
      total: mockTemplates.length
    }
  })
}

// POST /api/template/search - Search templates with request body
export async function POST(request: NextRequest) {
  try {
    const params: TFilterParams = await request.json()
    const filteredTemplates = filterTemplates(params)

    return NextResponse.json({
      data: {
        items: filteredTemplates,
        total: mockTemplates.length
      }
    })
  } catch {
    return NextResponse.json(
      { message: "Failed to search templates" },
      { status: 400 }
    )
  }
}
