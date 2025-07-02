import { create, ExtractState } from "zustand"
import { persist } from "zustand/middleware"

import { createSelectors } from "@/stores/selector"
import { getBrowser } from "@/utils/user-agent"

interface UserAgentState {
  uuid: string | null
  browser: {
    name: string
    version: string
  }
}

interface UserAgentStore extends UserAgentState {
  setField: (
    field: keyof UserAgentState,
    value: UserAgentState[keyof UserAgentState]
  ) => void
  getHeaders: () => Record<string, string>
}

export const baseUserAgentStore = create<UserAgentStore>()(
  persist(
    (set, get) => ({
      uuid: typeof window !== "undefined" ? window.crypto.randomUUID() : null,
      browser: getBrowser(),
      setField: (field, value) => set({ [field]: value }),
      getHeaders: () => ({
        "X-Device-ID": get().uuid || "",
        "X-Device-Type": get().browser.name || "",
        "X-Device-Version": get().browser.version || "",
        "X-Device-Timezone": Intl.DateTimeFormat().resolvedOptions().timeZone
      })
    }),
    {
      name: "user-agent-storage"
    }
  )
)

export const useUserAgentStore = createSelectors(baseUserAgentStore)

const getHeadersSelector = (state: ExtractState<typeof baseUserAgentStore>) =>
  state.getHeaders()

export const getHeaders = () => {
  if (typeof window === "undefined") return {}
  return getHeadersSelector(baseUserAgentStore.getState())
}
