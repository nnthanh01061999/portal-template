import { useTranslations } from "next-intl"

import { TFormItemConfig } from "@/types/form"

export const usePlaceholder = (type: "form" | "search" = "form") => {
  const t = useTranslations("Form")

  const getPlaceholder = (
    config: Partial<
      Pick<TFormItemConfig, "placeholder" | "label" | "componentType">
    >,
    keepOriginalFormat = false
  ): string => {
    const { placeholder, label = "", componentType = "STRING" } = config

    if (placeholder) return placeholder

    switch (componentType) {
      case "SELECT":
      case "DATE":
      case "DATE_RANGE":
        const nameFormatted = keepOriginalFormat ? label : label.toLowerCase()
        return t(type === "form" ? "please_select_item" : "search_by_item", {
          item: nameFormatted
        })
      default: {
        const nameFormatted = keepOriginalFormat ? label : label.toLowerCase()
        return t(type === "form" ? "please_enter_item" : "search_by_item", {
          item: nameFormatted
        })
      }
    }
  }

  return { getPlaceholder }
}

export default usePlaceholder
