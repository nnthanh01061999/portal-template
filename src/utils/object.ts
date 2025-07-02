import { MergeFieldToObjectParams, TAdditionalData } from "@/types"
import { set } from "@/utils/lodash"

export const cleanObject = (object: any) => {
  Object.entries(object).forEach(([k, v]: [k: any, v: any]) => {
    if (v && typeof v === "object") cleanObject(v)

    if (
      (v && typeof v === "object" && !Object.keys(v).length) ||
      v === null ||
      v === undefined ||
      v.length === 0
    ) {
      if (Array.isArray(object)) object.splice(k, 1)
      else if (!(v instanceof Date)) delete object[k]
    }
  })
  return object
}

export const mergeFieldToObject = <T, R extends TAdditionalData>({
  data,
  mapping
}: MergeFieldToObjectParams<T, R>) => {
  mapping.forEach((map) => {
    const item = map.items?.find((x) => map.compare(x, data))
    if (item) {
      set(data as any, map.alias as any, map.convert(item))
    }
  })
  return data
}
