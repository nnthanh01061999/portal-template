"use client"

import { notification } from "antd"
import { ArgsProps } from "antd/es/notification"
import { createContext, ReactNode, useContext, useMemo } from "react"

import useConfirm from "@/hooks/use-confirm"

type TUseConfirm = ReturnType<typeof useConfirm>

type NotifyProviderProps = {
  children: ReactNode
}

type NotifyContextType = {
  notify: {
    error: (props: Partial<ArgsProps>) => void
    info: (props: Partial<ArgsProps>) => void
    success: (props: Partial<ArgsProps>) => void
    warning: (props: Partial<ArgsProps>) => void
    open: (props: Partial<ArgsProps>) => void
    destroy: (key: React.Key) => void
  }
  confirm: {
    confirm: TUseConfirm["confirm"]
    config: TUseConfirm["config"]
    currentConfirmInstance: TUseConfirm["currentConfirmInstance"]
  }
}

export const NotifyContext = createContext<NotifyContextType>(
  {} as NotifyContextType
)

const NotifyProvider = (props: NotifyProviderProps) => {
  const { children } = props

  const [notify, notifyContextHolder] = notification.useNotification()

  const { confirmContextHolder, ...confirm } = useConfirm()

  const notifyValue = useMemo(
    () => ({
      notify: {
        error: (props: Omit<ArgsProps, "message">) =>
          notify.error({
            message: "Error",
            ...props
          }),
        info: (props: Omit<ArgsProps, "message">) =>
          notify.info({
            message: "Info",
            ...props
          }),
        success: (props: Omit<ArgsProps, "message">) =>
          notify.success({
            message: "Success",
            ...props
          }),
        warning: (props: Omit<ArgsProps, "message">) =>
          notify.warning({
            message: "Warning",
            ...props
          }),
        open: (props: Omit<ArgsProps, "message">) =>
          notify.open({
            message: "Open",
            ...props
          }),
        destroy: (key: React.Key) => notify.destroy(key)
      }
    }),
    [notify]
  )

  return (
    <NotifyContext.Provider
      value={{
        notify: notifyValue.notify,
        confirm
      }}>
      {children}
      {notifyContextHolder}
      {confirmContextHolder}
    </NotifyContext.Provider>
  )
}

export default NotifyProvider

export const useNotify = () => {
  const { notify, confirm: confirmContext } = useContext(NotifyContext)
  const { confirm, config, currentConfirmInstance } = confirmContext
  return {
    notify,
    confirm: {
      ...confirm,
      config,
      currentConfirmInstance
    }
  }
}
