import { useTranslations } from "next-intl"
import { useCallback } from "react"

import { BOOLEAN_OPTIONS, STATUS_OPTIONS } from "@/constants"
import { LocaleKey } from "@/i18n/type"
import { mapOptionsLocale } from "@/utils/array"
import { toLabelCase, toTitleCase } from "@/utils/format"

const useLocaleHelper = () => {
  const tC = useTranslations("Common")
  const t = useTranslations()

  const getManagementTitle = useCallback(
    (key: LocaleKey) =>
      toLabelCase(
        tC("item_management", {
          name: t(key)
        })
      ),
    [t, tC]
  )

  const getCodeTitle = useCallback(
    (key: LocaleKey) =>
      toTitleCase(
        tC("item_code", {
          name: t(key)
        })
      ),
    [t, tC]
  )

  const getNameTitle = useCallback(
    (key: LocaleKey) =>
      toTitleCase(
        tC("item_name", {
          name: t(key)
        })
      ),
    [t, tC]
  )

  const getListTitle = useCallback(
    (key: LocaleKey) =>
      toTitleCase(
        tC("item_list", {
          name: t(key)
        })
      ),
    [t, tC]
  )

  const getDetailTitle = useCallback(
    (key: LocaleKey) =>
      toTitleCase(
        tC("item_detail", {
          name: t(key)
        })
      ),
    [t, tC]
  )

  const getCreateTitle = useCallback(
    (key: LocaleKey) =>
      toTitleCase(
        tC("item_create", {
          name: t(key)
        })
      ),
    [t, tC]
  )

  const getUpdateTitle = useCallback(
    (key: LocaleKey) =>
      toTitleCase(
        tC("item_update", {
          name: t(key)
        })
      ),
    [t, tC]
  )

  const getDeleteTitle = useCallback(
    (key: LocaleKey) =>
      toTitleCase(
        tC("item_delete", {
          name: t(key)
        })
      ),
    [t, tC]
  )

  const getActionTitle = useCallback(
    (key: LocaleKey, action: "create" | "update" | "delete" = "create") => {
      if (action === "update") {
        return getUpdateTitle(key)
      }
      if (action === "delete") {
        return getDeleteTitle(key)
      }

      return getCreateTitle(key)
    },
    [getCreateTitle, getDeleteTitle, getUpdateTitle]
  )

  const getInformationTitle = useCallback(
    (key: LocaleKey) =>
      toTitleCase(
        tC("item_information", {
          name: t(key)
        })
      ),
    [t, tC]
  )

  const getBooleanOptions = useCallback(
    (toBeString = false) =>
      mapOptionsLocale({ options: BOOLEAN_OPTIONS, t, toBeString }),
    [t]
  )

  const getActiveOptions = useCallback(
    (toBeString = false) =>
      mapOptionsLocale({ options: STATUS_OPTIONS, t, toBeString }),
    [t]
  )

  return {
    getManagementTitle,
    getCodeTitle,
    getNameTitle,
    getListTitle,
    getDetailTitle,
    getCreateTitle,
    getUpdateTitle,
    getActionTitle,
    getInformationTitle,
    getBooleanOptions,
    getActiveOptions
  }
}

export default useLocaleHelper
