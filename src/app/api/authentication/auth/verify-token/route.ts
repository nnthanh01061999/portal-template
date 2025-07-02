import { NextRequest, NextResponse } from "next/server"

// Verify token handler
export async function PUT(request: NextRequest) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "")

    if (!token || !token.startsWith("mock-access-token-")) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 })
    }

    return NextResponse.json({ message: "Token is valid" }, { status: 200 })
  } catch {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 })
  }
}
