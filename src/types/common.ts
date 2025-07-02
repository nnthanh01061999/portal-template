export type Paths<T> = T extends object
  ? {
      [K in keyof T]: `${Exclude<K, symbol>}${"" | `.${Paths<T[K]>}`}`
    }[keyof T]
  : never

export type Leaves<T> = T extends object
  ? {
      [K in keyof T]: `${Exclude<K, symbol>}${Leaves<T[K]> extends never
        ? ""
        : `.${Leaves<T[K]>}`}`
    }[keyof T]
  : never

export type ValueOf<T> = T[keyof T]

export type OrderBy<T> = {
  order: "asc" | "desc" | string
  order_by: string | keyof T
}

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

export type TOption<V, L = string> = {
  value: V
  label: L
} & Record<string, any>

export type Assign<T1 = object, T2 = object> = Omit<T1, keyof T2> & T2

export type TOrderBy<T> = {
  order: "asc" | "desc" | string
  order_by: string | keyof T
}

export type TTemplateFormat = `${string}{value}${string}`
