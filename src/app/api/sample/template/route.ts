import { NextRequest, NextResponse } from "next/server"

import { mockTemplates } from "@/app/api/sample/template/utils"
import { TTemplate } from "@/types/model/template"

// POST /api/template - Create a new template
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Generate a new template
    const newTemplate: TTemplate = {
      id: `template-${mockTemplates.length + 1}`,
      code: body.code || `CODE-${mockTemplates.length + 1}`,
      name: body.name || `New Template ${mockTemplates.length + 1}`,
      isActive: body.isActive ?? true,
      translation: body.translation || {
        name: {
          en: body.name || `New Template ${mockTemplates.length + 1}`,
          vi: `Mẫu mới ${mockTemplates.length + 1}`
        }
      },
      audit: {
        isDeleted: false,
        createdBy: "admin",
        updatedBy: "admin",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    }

    // In a real app, you would save this to a database
    mockTemplates.push(newTemplate)

    return NextResponse.json(
      {
        data: newTemplate
      },
      { status: 201 }
    )
  } catch {
    return NextResponse.json(
      { message: "Failed to create template" },
      { status: 400 }
    )
  }
}
