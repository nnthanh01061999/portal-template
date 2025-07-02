import { NextRequest, NextResponse } from "next/server"

import { mockTemplates } from "@/app/api/sample/template/utils"

// GET /api/template/[id] - Get a single template
export async function GET(_: NextRequest, { params }: any) {
  const { id } = params
  const template = mockTemplates.find((t) => t.id === id)

  if (!template) {
    return NextResponse.json(
      { message: `Template with id ${id} not found` },
      { status: 404 }
    )
  }

  return NextResponse.json({
    data: template
  })
}

// PATCH /api/template/[id] - Update a template
export async function PATCH(request: NextRequest, { params }: any) {
  try {
    const { id } = params
    const body = await request.json()

    const templateIndex = mockTemplates.findIndex((t) => t.id === id)

    if (templateIndex === -1) {
      return NextResponse.json(
        { message: `Template with id ${id} not found` },
        { status: 404 }
      )
    }

    // Update the template
    const updatedTemplate = {
      ...mockTemplates[templateIndex],
      ...body,
      audit: {
        ...mockTemplates[templateIndex].audit,
        updatedBy: "admin",
        updatedAt: new Date().toISOString()
      }
    }

    // In a real app, you would update this in a database
    mockTemplates[templateIndex] = updatedTemplate

    return NextResponse.json({
      data: updatedTemplate
    })
  } catch {
    return NextResponse.json(
      { message: "Failed to update template" },
      { status: 400 }
    )
  }
}

// DELETE /api/template/[id] - Delete a template
export async function DELETE(_: NextRequest, { params }: any) {
  const { id } = params
  const templateIndex = mockTemplates.findIndex((t) => t.id === id)

  if (templateIndex === -1) {
    return NextResponse.json(
      { message: `Template with id ${id} not found` },
      { status: 404 }
    )
  }

  // In a real app, you would delete this from a database
  // Here we'll just mark it as deleted
  mockTemplates[templateIndex] = {
    ...mockTemplates[templateIndex],
    audit: {
      ...mockTemplates[templateIndex].audit,
      isDeleted: true,
      updatedBy: "admin",
      updatedAt: new Date().toISOString()
    }
  }

  return NextResponse.json(
    { message: `Template with id ${id} deleted successfully` },
    { status: 200 }
  )
}
