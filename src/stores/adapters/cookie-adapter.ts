import { createJSONStorage } from "zustand/middleware"

import {
  deleteCookieValue,
  getCookieValue,
  setCookieValue
} from "@/helpers/cookies/client"

/**
 * Chrome storage adapter for Zustand persist middleware
 *
 * This adapter implements the storage interface required by Zustand's persist middleware
 * and properly handles Chrome's storage.sync API.
 */

export const cookieStore = {
  /**
   * Get an item from Chrome's sync storage
   */
  getItem: (name: string): Promise<string | null> => {
    return new Promise((resolve, reject) => {
      try {
        const value = getCookieValue(name)
        resolve(value ? value.toString() : "")
      } catch (error) {
        reject(error)
      }
    })
  },

  /**
   * Set an item in Chrome's sync storage
   */
  setItem: (name: string, value: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      try {
        setCookieValue(name, value)
        resolve()
      } catch (error) {
        reject(error)
      }
    })
  },

  /**
   * Remove an item from Chrome's sync storage
   */
  removeItem: (name: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      try {
        deleteCookieValue(name)
        resolve()
      } catch (error) {
        reject(error)
      }
    })
  }
}

export const cookieStorageAdapter = createJSONStorage(() => cookieStore)
