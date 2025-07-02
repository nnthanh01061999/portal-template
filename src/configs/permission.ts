import { routeConfig } from "@/configs/routes"

export type PermissionConfig = typeof permissionConfig
export type KeyOfPermission = keyof PermissionConfig

export type ValueOfPermission<T extends KeyOfPermission = KeyOfPermission> =
  keyof (typeof permissionConfig)[T]

export const nonCheckPermissionPaths = [
  routeConfig.home,
  routeConfig.auth.login,
  routeConfig.auth.profile,
  routeConfig.template.list
]

export const permissionConfig = {
  example: {
    view: "example-view",
    create: "example-create",
    update: "example-update",
    delete: "example-delete"
  }
} satisfies Record<string, Record<string, string> & { view: string }>
