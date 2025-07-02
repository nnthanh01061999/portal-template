import { FC, ReactNode, useEffect } from "react"

import { useNotify } from "@/components/providers/notify-provider"
import { APP_MODEL, APP_VERSION } from "@/constants"
import useMutationApi from "@/hooks/query/use-mutation-api"
import { getMessagingToken, onMessageListener } from "@/lib/firebase"
import { getToken, useNotificationStore } from "@/stores/stores/notification"
import { useUserAgentStore } from "@/stores/stores/user-agent"
import { IDeviceInfo } from "@/types"

interface FirebaseProviderProps {
  children: ReactNode
}

const FirebaseProvider: FC<FirebaseProviderProps> = ({ children }) => {
  const setToken = useNotificationStore.use.setToken()
  const baseHeader = useUserAgentStore.use.getHeaders()

  const { notify } = useNotify()

  const { mutate: sendDeviceInfo } = useMutationApi<IDeviceInfo>(
    "notification/public/device/register"
  )

  //TODO handle sendDeviceInfo when user logout, login, change language, or new token

  useEffect(() => {
    const initializeFirebaseMessaging = async () => {
      try {
        const token = await getMessagingToken()
        const oldToken = getToken()
        const headers = baseHeader()

        if (token !== oldToken) {
          setToken(token)
          if (token) {
            sendDeviceInfo({
              token,
              platform: headers["X-Device-Platform"],
              timezone: headers["X-Device-Timezone"],
              appVersion: APP_VERSION,
              platformVersion: headers["X-Device-Version"],
              model: APP_MODEL,
              name: "test",
              location: {
                latitude: 0,
                longitude: 0
              }
            })
          }
        }
      } catch (error) {
        console.error("Error initializing Firebase messaging:", error)
      }
    }

    initializeFirebaseMessaging()
  }, [baseHeader, sendDeviceInfo, setToken])

  useEffect(() => {
    const unsubscribe = onMessageListener((payload) => {
      const { notification: messageNotification } = payload

      if (messageNotification) {
        notify.info({
          message: messageNotification.title,
          description: messageNotification.body,
          placement: "topRight",
          duration: 5
        })
      }
    })

    return () => {
      unsubscribe()
    }
  }, [notify])

  return <>{children}</>
}

export default FirebaseProvider
