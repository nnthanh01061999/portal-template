import { PropsWithChildren } from "react"

import useQueryApi from "@/hooks/query/use-query-api"
import { useAuthStore } from "@/stores/stores/auth"
import { IUser, TResponseDetail } from "@/types"

type TAuthProviderProps = PropsWithChildren
function AuthProvider({ children }: TAuthProviderProps) {
  const setUser = useAuthStore.use.setUser()
  const logged = useAuthStore.use.logged()

  useQueryApi<TResponseDetail<IUser>>("authorization/me/account", {
    enabled: logged,
    onSuccess: (data) => {
      setUser({
        user: data.data
      })
    }
  })

  return <>{children}</>
}

export default AuthProvider
