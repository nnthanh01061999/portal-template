import { NextRequest, NextResponse } from "next/server"

import { TChangePasswordFormValues } from "@/types/model/auth"

// Helper function to extract user ID from token
function getUserIdFromToken(request: NextRequest): string | null {
  const token = request.headers.get("authorization")?.replace("Bearer ", "")

  if (!token || !token.startsWith("mock-access-token-")) {
    return null
  }

  return token.split("-")[3]
}

// Change password
export async function PUT(request: NextRequest) {
  try {
    const userId = getUserIdFromToken(request)

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const body: TChangePasswordFormValues = await request.json()

    // Validate old password - in a real app, this would check against stored password
    if (body.oldPassword !== "password") {
      return NextResponse.json(
        { message: "Current password is incorrect" },
        { status: 400 }
      )
    }

    // Validate new password
    if (body.newPassword !== body.confirmPassword) {
      return NextResponse.json(
        { message: "New password and confirmation do not match" },
        { status: 400 }
      )
    }

    // Password should be at least 8 characters
    if (body.newPassword.length < 8) {
      return NextResponse.json(
        { message: "New password should be at least 8 characters" },
        { status: 400 }
      )
    }

    // In a real app, you would update the password in the database

    return NextResponse.json(
      { message: "Password changed successfully" },
      { status: 200 }
    )
  } catch {
    return NextResponse.json(
      { message: "Invalid request format" },
      { status: 400 }
    )
  }
}
