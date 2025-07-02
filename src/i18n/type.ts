import { Paths } from "@/types"

import en from "../../messages/en.json"

type LocalePaths<
  T,
  Prefix extends string | number | bigint | boolean | null | undefined = ""
> = T extends object
  ? {
      [K in keyof T]: Prefix extends ""
        ? `${Exclude<K, symbol>}${LocalePaths<T[K], ".">}`
        : `${Prefix}${Exclude<K, symbol>}${"" | `.${Paths<T[K]>}`}`
    }[keyof T]
  : ""

export type LocaleKey = LocalePaths<typeof en>
