import { Modal, ModalFuncProps } from "antd"
import { useTranslations } from "next-intl"
import { useCallback, useMemo, useState } from "react"

import useBaseConfirmConfig from "@/hooks/use-base-confirm"

type TConfirmInstance = {
  destroy: () => void
  update: (configUpdate: any) => void
}

const useConfirm = () => {
  const [modal, confirmContextHolder] = Modal.useModal()
  const baseConfig = useBaseConfirmConfig()
  const t = useTranslations("Common")
  const [currentInstance, setCurrentInstance] =
    useState<TConfirmInstance | null>(null)

  const confirm = useCallback(
    (props?: ModalFuncProps) => {
      const instance = modal.confirm({
        ...baseConfig,
        maskClosable: false,
        ...props
      })
      setCurrentInstance(instance)
      return instance
    },
    [baseConfig, modal]
  )

  const confirmYesNo = useCallback(
    (props?: ModalFuncProps) => {
      const instance = modal.confirm({
        ...baseConfig,
        closable: false,
        maskClosable: false,
        okText: t("yes"),
        cancelText: t("no"),
        ...props
      })
      setCurrentInstance(instance)
      return instance
    },
    [baseConfig, modal, t]
  )

  const error = useCallback(
    (props?: ModalFuncProps, timeOut = 0) => {
      const instance = modal.error({
        ...baseConfig,
        ...props
      })
      //auto close after timeout
      if (timeOut) setTimeout(() => instance.destroy(), timeOut)
      setCurrentInstance(instance)
      return instance
    },
    [baseConfig, modal]
  )

  const info = useCallback(
    (props?: ModalFuncProps) => {
      return modal.info({
        ...baseConfig,
        ...props
      })
    },
    [baseConfig, modal]
  )

  const success = useCallback(
    (props?: ModalFuncProps, timeOut = 0) => {
      const instance = modal.success({
        ...baseConfig,
        ...props
      })
      //auto close after timeout
      if (timeOut) setTimeout(() => instance.destroy(), timeOut)
      setCurrentInstance(instance)
      return instance
    },
    [baseConfig, modal]
  )

  const warning = useCallback(
    (props?: ModalFuncProps) => {
      return modal.warning({
        okText: t("understood"),
        ...baseConfig,
        ...props
      })
    },
    [baseConfig, modal, t]
  )

  const confirmValue = useMemo(
    () => ({
      confirm,
      confirmYesNo,
      error,
      info,
      success,
      warning,
      destroyAll: Modal.destroyAll
    }),
    [confirm, confirmYesNo, error, info, success, warning]
  )

  return {
    confirmContextHolder,
    confirm: confirmValue,
    currentConfirmInstance: currentInstance,
    config: {
      baseConfig
    }
  }
}

export default useConfirm

export type TConfirm = ReturnType<typeof useConfirm>["confirm"]
export type TConfirmContextHolder = ReturnType<
  typeof useConfirm
>["confirmContextHolder"]
