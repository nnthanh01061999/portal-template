import { TTranslation } from "@/types/api"

export interface ILoginFormValues {
  userType: string
  clientId: string
  clientSecret: string
  remember: boolean
}

export interface ILoginResponse {
  accessToken: string
  refreshToken: string
  tokenType: string
}

export interface IDeviceInfo {
  name: string
  token: string
  platform: string
  timezone: string
  appVersion: string
  platformVersion: string
  model: string
  location: IUserLocation
}

interface IUserLocation {
  latitude: number
  longitude: number
}

export interface IUser {
  id: string
  code: string
  name: string
  isActive: boolean
  userType: string
  isAdmin: boolean
  translation: TTranslation
}

export type TChangePasswordFormValues = {
  oldPassword: string
  newPassword: string
  confirmPassword: string
}

export type TProfileFormValues = Partial<IUser>
