console.log("[Firebase SW] Service Worker Loaded")
importScripts(
  "https://www.gstatic.com/firebasejs/10.1.0/firebase-app-compat.js"
)
importScripts(
  "https://www.gstatic.com/firebasejs/10.1.0/firebase-messaging-compat.js"
)
importScripts("/sw-process-env.js")

// Firebase configuration
// IMPORTANT: Service workers cannot access process.env variables
// These values need to be hardcoded or injected at build time
const firebaseConfig = {
  apiKey: self.SW_ENV.FIREBASE_API_KEY,
  authDomain: self.SW_ENV.FIREBASE_AUTH_DOMAIN,
  projectId: self.SW_ENV.FIREBASE_PROJECT_ID,
  storageBucket: self.SW_ENV.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: self.SW_ENV.FIREBASE_MESSAGING_SENDER_ID,
  appId: self.SW_ENV.FIREBASE_APP_ID,
  measurementId: self.SW_ENV.FIREBASE_MEASUREMENT_ID
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

// Get messaging instance
const messaging = firebase.messaging()

// Handle background messages
messaging.onBackgroundMessage(function (payload) {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  )

  const { notification, data } = payload
  const notificationOptions = {
    body: notification?.body,
    icon: notification?.icon || "/logo.svg", // Default icon
    data: { url: data?.url || "/" } // Store URL in notification data
  }

  return self.registration.showNotification(
    notification.title,
    notificationOptions
  )
})

// Service worker lifecycle events
self.addEventListener("install", (event) => {
  console.log("[Firebase SW] Installing...")
  event.waitUntil(self.skipWaiting()) // Force the new SW to activate immediately
})

self.addEventListener("activate", (event) => {
  console.log("[Firebase SW] Activating...")
  event.waitUntil(
    self.clients.claim() // Take control over all open pages
  )
})

// Handle notification click
self.addEventListener("notificationclick", (event) => {
  console.log("[Firebase SW] Notification Clicked:", event)
  event.notification.close()

  const url = event.notification.data?.url
  if (url) {
    event.waitUntil(
      clients
        .matchAll({ type: "window", includeUncontrolled: true })
        .then((clientList) => {
          for (const client of clientList) {
            if (client.url === url && "focus" in client) {
              return client.focus()
            }
          }
          if (clients.openWindow) {
            return clients.openWindow(url)
          }
        })
    )
  }
})
