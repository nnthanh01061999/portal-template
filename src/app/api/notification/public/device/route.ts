import { NextResponse } from "next/server"

import { IDeviceInfo } from "@/types/model/auth"

// This is a reference to the same array in the register endpoint
// In a real implementation, this would be a database
const registeredDevices: IDeviceInfo[] = []

// GET /api/notification/public/device - List all registered devices (for testing purposes)
export async function GET() {
  return NextResponse.json({
    data: {
      items: registeredDevices,
      total: registeredDevices.length
    }
  })
}
