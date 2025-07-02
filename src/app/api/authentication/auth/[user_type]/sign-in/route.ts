import { NextRequest, NextResponse } from "next/server"

import { generateToken, mockUsers } from "@/app/api/authentication/utils"

// Sign in handler
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { clientId, clientSecret } = body

    // Check if user exists
    const user = mockUsers[clientId]

    if (!user || clientSecret !== "password") {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 400 }
      )
    }

    // Generate tokens
    const accessToken = generateToken(user.id, "access")
    const refreshToken = generateToken(user.id, "refresh")

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
      { message: "Invalid request format" },
      { status: 400 }
    )
  }
}
