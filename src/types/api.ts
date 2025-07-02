import { Paths, ValueOf } from "@/types"

export type TBaseModel<T = unknown> = {
  id: string
  code: string
  name: string
  additionalData?: T
}

export type TAdditionalData = Record<string, TBaseModel[]>

export type TResponseList<T, A extends TAdditionalData = TAdditionalData> = {
  data: {
    items: T[]
    total: number
    additionalData?: A
  }
}

export type TResponseDetail<T, A extends TAdditionalData = TAdditionalData> = {
  data: T
  additionalData?: A
}

export type TResponseDetailWithItem<
  T,
  A extends TAdditionalData = TAdditionalData
> = {
  data: {
    item: T
  }
  additionalData?: A
}

export type TPagination = {
  index: number
  limit: number
  total: number
  refresh: boolean
}

export type TTranslationModel = Record<string, string>

export type TTranslation = Record<string, TTranslationModel>

export type TAudit = {
  isDeleted: boolean
  createdBy: string
  updatedBy: string
  createdAt: string
  updatedAt: string
}

export type TOrder<T> = {
  order_by: keyof T
  order: "asc" | "desc"
}

export type TInclude = {
  include?: string[]
  exclude?: string[]
}

export type TFilterOption = {
  includeAdditional: boolean
}

export type TFilter = {
  keyword?: string
  ids?: TInclude
  codes?: TInclude
  isActive?: boolean
}

export type TFilterParams<T extends object | undefined = undefined> = {
  pagination?: TPagination
  order?: TOrder<T>
  filter?: TFilter
  options?: TFilterOption
}

export interface IMergeFieldMapping<T, R extends TAdditionalData> {
  alias: Paths<T>
  items?: any[]
  compare: (add: ValueOf<R>[number], t: T) => boolean
  convert: (r: ValueOf<R>[number]) => any
}

export interface MergeFieldToArrayParams<T, R extends TAdditionalData> {
  items: T[]
  mapping: IMergeFieldMapping<T, R>[]
  childrenField?: Paths<T> | "children"
}

export interface MergeFieldToObjectParams<T, R extends TAdditionalData> {
  data: T
  mapping: IMergeFieldMapping<T, R>[]
  childrenField?: Paths<T> | "children"
}

export type TTree<T extends object = object> = T & {
  children?: TTree<T>[]
}
