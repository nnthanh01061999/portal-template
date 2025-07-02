import { authRoutes } from "@/configs/routes/auth"
import { templateRoutes } from "@/configs/routes/template"

export const routeConfig = {
  home: "/dashboard",
  dashboard: "/",
  notFound: "/404",
  error: "/500",
  template: templateRoutes,
  auth: authRoutes
}
