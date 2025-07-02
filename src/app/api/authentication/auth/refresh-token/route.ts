import { NextRequest, NextResponse } from "next/server"

import { generateToken } from "@/app/api/authentication/utils"

// Refresh token handler
export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "")

    if (!token || !token.startsWith("mock-refresh-token-")) {
      return NextResponse.json(
        { message: "Invalid refresh token" },
        { status: 401 }
      )
    }

    // Extract user ID from token
    const userId = token.split("-")[3]

    // Generate new tokens
    const accessToken = generateToken(userId, "access")
    const refreshToken = generateToken(userId, "refresh")

    const response = NextResponse.json(
      {
        data: {
          accessToken,
          refreshToken,
          tokenType: "Bearer"
        }
      },
      { status: 200 }
    )

    return response
  } catch {
    return NextResponse.json(
      { message: "Invalid refresh token" },
      { status: 401 }
    )
  }
}
