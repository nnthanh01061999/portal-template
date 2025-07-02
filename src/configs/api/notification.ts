import { API_NOTIFICATION_ENDPOINT, baseHeader } from "@/constants"

export default {
  "notification/public/device/register": {
    url: `${API_NOTIFICATION_ENDPOINT}/public/device/register`,
    options: {
      method: "POST",
      headers: baseHeader,
      responseType: "text"
    }
  }
} satisfies Record<string, ApiConfig>
