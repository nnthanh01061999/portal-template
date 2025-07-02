import { create } from "zustand"
import { persist } from "zustand/middleware"

import { routeConfig } from "@/configs/routes"
import { STORE_KEYS, USER_TYPE } from "@/constants"
import { cookieStorageAdapter } from "@/stores/adapters/cookie-adapter"
import { createSelectors } from "@/stores/selector"
import { ExtractState, IUser } from "@/types"

export type AuthData = {
  logged: boolean
  user?: IUser
  accessToken?: string
  refreshToken?: string
  tokenType?: string
  userType: string
}

type AuthStore = {
  login: (data: {
    tokenType: string
    accessToken: string
    refreshToken: string
    userType: string
  }) => void
  logout: () => void
  clearTokens: () => void
  setToken: (data: {
    tokenType: string
    accessToken: string
    refreshToken: string
  }) => void
  setAccessToken: (data: { accessToken: string }) => void
  setUser: (data: { user: IUser }) => void
} & AuthData

const authStore = create<AuthStore>()(
  persist(
    (set) => ({
      logged: false,
      user: undefined,
      accessToken: undefined,
      refreshToken: undefined,
      tokenType: "Bearer",
      userType: USER_TYPE.SYSTEM,
      login: ({ accessToken, refreshToken, tokenType, userType }) => {
        set({
          logged: true,
          accessToken,
          refreshToken,
          tokenType,
          userType
        })
      },
      logout: () => {
        set({
          logged: false,
          accessToken: undefined,
          refreshToken: undefined,
          tokenType: "Bearer"
        })
        window.location.href = routeConfig.auth.login
      },

      setToken: ({ accessToken, refreshToken, tokenType }) => {
        set({
          refreshToken,
          accessToken,
          tokenType
        })
      },

      setAccessToken: ({ accessToken }) => {
        set({
          accessToken
        })
      },

      clearTokens: () => {
        set({
          accessToken: undefined,
          refreshToken: undefined
        })
      },

      setUser: ({ user }) => {
        set({
          user
        })
      }
    }),
    {
      name: STORE_KEYS.auth,
      storage: cookieStorageAdapter
    }
  )
)

// Selectors
const accessTokenSelector = (state: ExtractState<typeof authStore>) =>
  state.accessToken
const refreshTokenSelector = (state: ExtractState<typeof authStore>) =>
  state.refreshToken
const tokenTypeSelector = (state: ExtractState<typeof authStore>) =>
  state.tokenType
const loggedSelector = (state: ExtractState<typeof authStore>) => state.logged
const loginSelector = (state: ExtractState<typeof authStore>) => state.login
const logoutSelector = (state: ExtractState<typeof authStore>) => state.logout
const clearTokensSelector = (state: ExtractState<typeof authStore>) =>
  state.clearTokens
const setTokenSelector = (state: ExtractState<typeof authStore>) =>
  state.setToken
const setAccessTokenSelector = (state: ExtractState<typeof authStore>) =>
  state.setAccessToken
const userSelector = (state: ExtractState<typeof authStore>) => state.user

// getters
export const getAccessToken = () => accessTokenSelector(authStore.getState())
export const getRefreshToken = () => refreshTokenSelector(authStore.getState())
export const getTokenType = () => tokenTypeSelector(authStore.getState())
export const getLogged = () => loggedSelector(authStore.getState())
export const getLogin = () => loginSelector(authStore.getState())
export const getLogout = () => logoutSelector(authStore.getState())
export const getClearTokens = () => clearTokensSelector(authStore.getState())
export const getSetToken = () => setTokenSelector(authStore.getState())
export const getSetAccessToken = () =>
  setAccessTokenSelector(authStore.getState())
export const getUser = () => userSelector(authStore.getState())

export const useAuthStore = createSelectors(authStore)
