import { create } from "zustand"
import { devtools } from "zustand/middleware"

import { createSelectors } from "@/stores/selector"

type EventCallback<T = unknown> = (data: T) => void

type EventListeners = {
  [event: string]: Set<EventCallback>
}

type EventStore = {
  listeners: EventListeners
  subscribeTo: <T = unknown>(
    event: string,
    callback: EventCallback<T>
  ) => () => void
  emit: <T = unknown>(event: string, data: T) => void
}

export const eventStoreBase = create<EventStore>()(
  devtools(
    (set, get) => ({
      listeners: {},

      emit: (event, data) => {
        const callbacks = get().listeners[event]
        if (callbacks) {
          callbacks.forEach((cb) => cb(data))
        }
      },

      subscribeTo: (event, callback) => {
        set((state) => {
          const updated = { ...state.listeners }
          if (!updated[event]) updated[event] = new Set()
          updated[event].add(callback as EventCallback)
          return { listeners: updated }
        })

        return () => {
          set((state) => {
            const updated = { ...state.listeners }
            updated[event]?.delete(callback as EventCallback)
            if (updated[event]?.size === 0) {
              delete updated[event]
            }
            return { listeners: updated }
          })
        }
      }
    }),
    { name: "event" }
  )
)

export const useEventStore = createSelectors(eventStoreBase)
