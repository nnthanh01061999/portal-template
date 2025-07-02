import { TFormComponentType } from "@/types/form"

export const valuePropsName = {
  INPUT: "value",
  TEXTAREA: "value",
  NUMBER: "value",
  SELECT: "value",
  INFINITE_SELECT: "value",
  DATE: "value",
  DATE_RANGE: "value",
  TIME: "value",
  RADIO: "value",
  CHECKBOX: "checked",
  SWITCH: "checked"
} satisfies Record<TFormComponentType, string>
