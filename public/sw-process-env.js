// This file provides environment variables to the service worker
// Service workers cannot access process.env directly

// Firebase configuration for service worker
self.SW_ENV = {
  FIREBASE_API_KEY: "",
  FIREBASE_AUTH_DOMAIN: "",
  FIREBASE_PROJECT_ID: "",
  FIREBASE_STORAGE_BUCKET: "",
  FIREBASE_MESSAGING_SENDER_ID: "",
  FIREBASE_APP_ID: "",
  FIREBASE_MEASUREMENT_ID: ""
}

console.log("[SW] Environment variables loaded")
