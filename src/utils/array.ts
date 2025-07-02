import { MergeFieldToArrayParams, TAdditionalData, TOption } from "@/types"
import { set } from "@/utils/lodash"

export const mapOptionsLocale = <T>({
  options,
  t,
  toBeString = false
}: {
  options: TOption<any, T>[]
  t: any
  toBeString?: boolean
}) => {
  return options.map((item) => ({
    ...item,
    value: toBeString ? String(item.value) : item.value,
    label: t(item.label)
  }))
}

export const mergeFieldToArray = <T, R extends TAdditionalData>({
  items,
  mapping
}: MergeFieldToArrayParams<T, R>) => {
  items?.forEach((root) => {
    mapping.forEach((map) => {
      const item = map.items?.find((x) => map.compare(x, root))
      if (item) {
        set(root, map.alias, map.convert(item))
      }
    })
  })
  return items
}

export const mergeFieldToArrayTree = <T, R extends TAdditionalData>({
  items,
  mapping,
  childrenField = "children"
}: MergeFieldToArrayParams<T, R>) => {
  const traverseTree = (nodes: MergeFieldToArrayParams<T, R>["items"]) => {
    if (!nodes) return
    nodes.forEach((root) => {
      mapping.forEach((map) => {
        const item = map.items?.find((x) => map.compare(x, root))
        if (item) {
          set(root as any, map.alias as any, map.convert(item))
        }
      })
      const children = root[childrenField as keyof typeof root]
      if (children && Array.isArray(children)) {
        traverseTree(children)
      }
    })
  }

  traverseTree(items)
  return items
}

export const convertArrayToObject = <T extends TOption<any, any>>(
  arr: T[]
): Record<string, T> => {
  return arr.reduce(
    (acc, item) => {
      acc[String(item.value)] = item
      return acc
    },
    {} as Record<string, T>
  )
}
