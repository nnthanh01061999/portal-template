export const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"

export const APP_VERSION = process.env.NEXT_PUBLIC_APP_VERSION || "1.0.0"

export const APP_MODEL = "WEBSITE"

export const API_AUTHENTICATION_ENDPOINT = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/authentication`
export const API_AUTHORIZATION_ENDPOINT = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/authorization`
export const API_SAMPLE_ENDPOINT = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/sample`
export const API_NOTIFICATION_ENDPOINT = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/notification`
