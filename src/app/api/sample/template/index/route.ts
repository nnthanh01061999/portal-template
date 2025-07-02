import { NextResponse } from "next/server"

import { mockTemplates } from "@/app/api/sample/template/utils"

// GET /api/template - List all templates
export async function GET() {
  return NextResponse.json({
    data: {
      items: mockTemplates,
      total: mockTemplates.length
    }
  })
}
