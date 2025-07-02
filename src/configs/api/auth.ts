import { API_AUTHENTICATION_ENDPOINT, baseHeader } from "@/constants"

export default {
  "authentication/verify-token": {
    url: `${API_AUTHENTICATION_ENDPOINT}/auth/verify-token`,
    options: {
      method: "POST",
      headers: baseHeader
    }
  },
  "authentication/refresh-token": {
    url: `${API_AUTHENTICATION_ENDPOINT}/auth/refresh-token`,
    options: {
      method: "GET",
      headers: baseHeader
    }
  },
  "authentication/sign-in": {
    url: `${API_AUTHENTICATION_ENDPOINT}/auth/:user_type/sign-in`,
    options: {
      method: "POST",
      headers: baseHeader
    }
  },
  "authorization/me/account": {
    url: `${API_AUTHENTICATION_ENDPOINT}/me/account`,
    options: {
      method: "GET",
      headers: baseHeader
    }
  },
  "authorization/me/account/update": {
    url: `${API_AUTHENTICATION_ENDPOINT}/me/account`,
    options: {
      method: "PATCH",
      headers: baseHeader,
      responseType: "text"
    }
  },
  "authorization/me/account/password": {
    url: `${API_AUTHENTICATION_ENDPOINT}/me/account/password`,
    options: {
      method: "PUT",
      headers: baseHeader,
      responseType: "text"
    }
  }
} satisfies Record<string, ApiConfig>
