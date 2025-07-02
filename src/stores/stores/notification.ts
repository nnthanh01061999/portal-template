import { create, ExtractState } from "zustand"
import { persist } from "zustand/middleware"

import { createSelectors } from "@/stores/selector"

interface NotificationState {
  token: string | null
  isEnabled: boolean
  setToken: (token: string | null) => void
  setIsEnabled: (isEnabled: boolean) => void
  clearToken: () => void
}

export const baseNotificationStore = create<NotificationState>()(
  persist(
    (set) => ({
      token: null,
      isEnabled: false,
      setToken: (token) => set({ token, isEnabled: !!token }),
      setIsEnabled: (isEnabled) => set({ isEnabled }),
      clearToken: () => set({ token: null, isEnabled: false })
    }),
    {
      name: "notification-storage"
    }
  )
)

export const useNotificationStore = createSelectors(baseNotificationStore)

export const tokenSelector = (
  state: ExtractState<typeof baseNotificationStore>
) => state.token

const clearTokenSelector = (
  state: ExtractState<typeof baseNotificationStore>
) => state.clearToken

export const getToken = () => tokenSelector(baseNotificationStore.getState())
export const getClearToken = () =>
  clearTokenSelector(baseNotificationStore.getState())
