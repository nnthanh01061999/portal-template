import { IUser } from "@/types/model/auth"

export const mockUserInfos: Record<string, IUser> = {
  usr001: {
    id: "usr001",
    code: "USER001",
    name: "Admin User",
    isActive: true,
    userType: "user",
    isAdmin: true,
    translation: {
      name: {
        en: "Admin User",
        vi: "Quản trị viên"
      }
    }
  },
  usr002: {
    id: "usr002",
    code: "USER002",
    name: "Regular User",
    isActive: true,
    userType: "user",
    isAdmin: false,
    translation: {
      name: {
        en: "Regular User",
        vi: "Người dùng thông thường"
      }
    }
  }
}

// Mock user data
export const mockUsers: Record<string, IUser> = {
  "admin@example.com": {
    ...mockUserInfos["usr001"]
  },
  "user@example.com": {
    ...mockUserInfos["usr002"]
  }
}

// Generate a mock token
export function generateToken(
  userId: string,
  type: "access" | "refresh"
): string {
  const expiration = type === "access" ? "1h" : "7d"
  return `mock-${type}-token-${userId}-${expiration}`
}
