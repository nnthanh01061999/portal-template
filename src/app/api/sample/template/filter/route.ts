import { NextResponse } from "next/server"

import { mockTemplates } from "@/app/api/sample/template/utils"
import { TBaseModel } from "@/types/api"

const mockFilterOptions: TBaseModel[] = mockTemplates.map((template) => ({
  id: template.id,
  code: template.code,
  name: template.name,
  additionalData: {}
}))

// GET /api/template/filter - Get filter options for templates
export async function GET() {
  // You could use request.nextUrl.searchParams to customize the response
  // based on query parameters if needed

  return NextResponse.json({
    data: {
      items: mockFilterOptions,
      total: Object.keys(mockFilterOptions).length
    }
  })
}
