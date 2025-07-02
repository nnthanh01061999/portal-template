import { FormRule } from "antd"
import { useTranslations } from "next-intl"

import { LocaleKey } from "@/i18n/type"

export const useDefaultRules = () => {
  const tForm = useTranslations("Form")
  const t = useTranslations()

  const getRequiredRule = (
    label: LocaleKey,
    type: "input" | "select" | "number",
    config?: FormRule,
    rules?: FormRule[],
    keepOriginalFormat = false
  ): FormRule[] => {
    const nameTranslated = label ? t(label) : ""
    const nameFormatted = keepOriginalFormat
      ? nameTranslated
      : nameTranslated.toLowerCase()

    switch (type) {
      case "input": {
        const rule = {
          required: true,
          message: tForm("please_enter_item", { item: nameFormatted }),
          whitespace: true,
          ...config
        }
        return rules?.length ? [rule, ...rules] : [rule]
      }

      case "select": {
        const rule = {
          required: true,
          message: tForm("please_select_item", { item: nameFormatted }),
          ...config
        }
        return rules?.length ? [rule, ...rules] : [rule]
      }

      case "number": {
        const rule = {
          required: true,
          message: tForm("please_enter_item", { item: nameFormatted }),
          ...config
        }
        return rules?.length ? [rule, ...rules] : [rule]
      }
    }
  }

  return {
    getRequiredRule
  }
}
