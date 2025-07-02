import { ModalFuncProps } from "antd"
import { useTranslations } from "next-intl"
import { useMemo } from "react"

const useBaseConfirmConfig = (): ModalFuncProps => {
  const t = useTranslations("Common")
  const config = useMemo(
    () =>
      ({
        title: t("are_you_sure"),
        icon: null,
        centered: true,
        closable: true,
        maskClosable: true
      }) satisfies ModalFuncProps,
    [t]
  )

  return config
}

export default useBaseConfirmConfig
