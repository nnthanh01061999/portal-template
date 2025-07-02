import { NextRequest, NextResponse } from "next/server"

import { mockUserInfos, mockUsers } from "@/app/api/authentication/utils"

// Helper function to extract user ID from token
function getUserIdFromToken(request: NextRequest): string | null {
  const token = request.headers.get("authorization")?.replace("Bearer ", "")

  if (!token || !token.startsWith("mock-access-token-")) {
    return null
  }

  return token.split("-")[3]
}

// Get user account details
export async function GET(request: NextRequest) {
  const userId = getUserIdFromToken(request)

  if (!userId || !mockUserInfos[userId]) {
    return NextResponse.json(
      { message: "Unauthorized or user not found" },
      { status: 400 }
    )
  }

  return NextResponse.json({
    data: mockUserInfos[userId]
  })
}

// Update user account details
export async function PATCH(request: NextRequest) {
  try {
    const userId = getUserIdFromToken(request)

    if (!userId || !mockUserInfos[userId]) {
      return NextResponse.json(
        { message: "Unauthorized or user not found" },
        { status: 401 }
      )
    }

    const body = await request.json()

    // Update user data
    mockUserInfos[userId] = {
      ...mockUserInfos[userId],
      ...body
    }

    return NextResponse.json({
      data: mockUsers[userId]
    })
  } catch {
    return NextResponse.json(
      { message: "Invalid request format" },
      { status: 400 }
    )
  }
}
