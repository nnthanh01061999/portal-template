import { NextRequest, NextResponse } from "next/server"

import { IDeviceInfo } from "@/types/model/auth"

// Store registered devices
const registeredDevices: IDeviceInfo[] = []

// POST /api/notification/public/device/register - Register a device for notifications
export async function POST(request: NextRequest) {
  try {
    const deviceInfo: IDeviceInfo = await request.json()

    // Validate required fields
    if (!deviceInfo.token || !deviceInfo.platform) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      )
    }

    // Check if device already exists (by token)
    const existingDeviceIndex = registeredDevices.findIndex(
      (device) => device.token === deviceInfo.token
    )

    if (existingDeviceIndex !== -1) {
      // Update existing device
      registeredDevices[existingDeviceIndex] = {
        ...registeredDevices[existingDeviceIndex],
        ...deviceInfo
      }
    } else {
      // Register new device
      registeredDevices.push(deviceInfo)
    }

    // Return plain text response as specified in the config
    return new NextResponse("Device registered successfully", {
      status: 200,
      headers: {
        "Content-Type": "text/plain"
      }
    })
  } catch {
    return new NextResponse("Invalid request format", {
      status: 400,
      headers: {
        "Content-Type": "text/plain"
      }
    })
  }
}
