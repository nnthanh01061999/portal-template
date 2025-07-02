import { getCookie, getCookies, hasCookie } from "cookies-next/server"
import { cookies } from "next/headers"

export const hasCookieValue = (name: string) => {
  return hasCookie(name, { cookies })
}

export const getCookieValue = (name: string) => {
  return getCookie(name, { cookies })
}

export const getCookiesValue = () => {
  return getCookies({ cookies })
}
