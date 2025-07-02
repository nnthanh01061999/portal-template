import { TAudit, TBaseModel, TOrder, TPagination } from "@/types"

export const DEFAULT_PAGINATION: TPagination = {
  index: 1,
  limit: 20,
  refresh: true,
  total: 0
}

export const DEFAULT_ORDER_CREATED_AT: TOrder<TAudit> = {
  order_by: "createdAt",
  order: "desc"
}

export const DEFAULT_ORDER: TOrder<TBaseModel> = {
  order_by: "id",
  order: "desc"
}
