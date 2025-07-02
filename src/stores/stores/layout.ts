import { create } from "zustand"

import { createSelectors } from "@/stores/selector"

interface LayoutState {
  collapsed: boolean
  toggleCollapsed: () => void
  setCollapsed: (collapsed: boolean) => void
}

export const baseLayoutStore = create<LayoutState>((set) => ({
  collapsed: false,
  toggleCollapsed: () => set((state) => ({ collapsed: !state.collapsed })),
  setCollapsed: (collapsed) => set({ collapsed })
}))

export const useLayoutStore = createSelectors(baseLayoutStore)
