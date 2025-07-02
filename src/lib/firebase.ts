"use client"

import { getApp, getApps, initializeApp } from "firebase/app"
import {
  getMessaging,
  getToken,
  isSupported,
  onMessage
} from "firebase/messaging"

import { FIREBASE_CONFIG, FIREBASE_VAPID_KEY } from "@/constants"
import { getToken as getCurrentToken } from "@/stores/stores/notification"

const app = !getApps().length ? initializeApp(FIREBASE_CONFIG) : getApp()

export const isFirebaseMessagingSupported = async (): Promise<boolean> => {
  try {
    const supported = await isSupported()
    console.log("Firebase Messaging supported:", supported)
    return supported
  } catch (error) {
    console.error("Firebase Messaging not supported:", error)
    return false
  }
}

export const requestNotificationPermission =
  async (): Promise<NotificationPermission> => {
    try {
      const permission = await Notification.requestPermission()
      return permission
    } catch (error) {
      console.error("Error requesting notification permission:", error)
      return "denied"
    }
  }

const registerServiceWorker =
  async (): Promise<ServiceWorkerRegistration | null> => {
    try {
      if ("serviceWorker" in navigator) {
        const existingRegistrations =
          await navigator.serviceWorker.getRegistrations()
        for (const registration of existingRegistrations) {
          await registration.unregister()
        }

        const registration = await navigator.serviceWorker.register(
          "/firebase-messaging-sw.js",
          {
            scope: "/firebase-cloud-messaging-push-scope"
          }
        )

        if (registration.installing) {
          const serviceWorker = registration.installing

          return new Promise((resolve) => {
            serviceWorker.addEventListener("statechange", function () {
              if (this.state === "activated") {
                resolve(registration)
              }
            })
          })
        }

        return registration
      }
      return null
    } catch (error) {
      console.error("Error registering service worker:", error)
      return null
    }
  }

export const getMessagingToken = async (): Promise<string | null> => {
  try {
    const isSupported = await isFirebaseMessagingSupported()
    if (!isSupported) {
      return null
    }

    const permission = await requestNotificationPermission()
    if (permission !== "granted") {
      return null
    }

    const swRegistration = await registerServiceWorker()

    if (!swRegistration) {
      return null
    }

    const messaging = getMessaging(app)

    try {
      const oldToken = getCurrentToken()
      if (oldToken) {
        console.log("Firebase Messaging token form store:", oldToken)
        return oldToken
      }

      const token = await getToken(messaging, {
        vapidKey: FIREBASE_VAPID_KEY,
        serviceWorkerRegistration: swRegistration
      })

      if (token) {
        console.log("Firebase Messaging token generated:", token)
        return token
      } else {
        console.log("No Firebase Messaging token available - returned empty")
        return null
      }
    } catch (tokenError) {
      console.warn("Error getting token:", tokenError)
      return null
    }
  } catch (error) {
    console.error("Error getting Firebase Messaging token:", error)
    return null
  }
}

export const onMessageListener = (
  callback: (payload: any) => void
): (() => void) => {
  try {
    if (!isFirebaseMessagingSupported()) {
      return () => {}
    }

    const messaging = getMessaging(app)
    return onMessage(messaging, (payload) => {
      console.log("Message received in listener:", payload)
      callback(payload)
    })
  } catch (error) {
    console.error("Error setting up message listener:", error)
    return () => {}
  }
}

export { app }
