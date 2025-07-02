import {
  deleteCookie as deleteCookiePrimitive,
  getCookie as getCookiePrimitive,
  getCookies as getCookiesPrimitive,
  hasCookie,
  OptionsType,
  setCookie
} from "cookies-next"

const MAX_AGE = 60 * 60 * 24 * 30

export const getCookieValue = (name: string, options?: OptionsType) => {
  return getCookiePrimitive(name, {
    maxAge: MAX_AGE,
    ...options
  })
}

export const getCookiesValue = (options?: OptionsType) => {
  return getCookiesPrimitive({
    maxAge: MAX_AGE,
    ...options
  })
}

export const getCookieJson = <V>(
  name: string,
  options?: OptionsType
): V | undefined => {
  const value = getCookieValue(name, options) as string
  try {
    return JSON.parse(value)
  } catch {
    return undefined
  }
}

export const setCookieValue = <V>(
  name: string,
  value: V,
  options?: OptionsType
) => {
  return setCookie(name, value, {
    maxAge: MAX_AGE,
    ...options
  })
}

export const deleteCookieValue = (name: string, options?: OptionsType) => {
  return deleteCookiePrimitive(name, {
    maxAge: MAX_AGE,
    ...options
  })
}

export const hasCookieValue = (name: string, options?: OptionsType) => {
  return hasCookie(name, {
    maxAge: MAX_AGE,
    ...options
  })
}
