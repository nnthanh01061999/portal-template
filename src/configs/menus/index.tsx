import { ProLayoutProps } from "@ant-design/pro-layout"
import { House, List, Smile } from "lucide-react"

import { routeConfig } from "@/configs/routes"

export type TMenu = NonNullable<ProLayoutProps["route"]>["routes"][number]

export const menus: TMenu[] = [
  {
    path: routeConfig.dashboard,
    name: "Dashboard",
    icon: <House className="size-4" />
  },
  {
    path: routeConfig.template.list,
    name: "Template",
    icon: <Smile className="size-4" />
  },
  {
    path: routeConfig.notFound,
    name: "Not Found",
    icon: <Smile className="size-4" />
  },
  {
    path: "/example",
    name: "Main Menu",
    icon: <List className="size-4" />,
    children: [
      {
        path: "/example/1",
        name: "Sub Menu"
      },
      {
        path: "/example/2",
        name: "Sub Menu 2"
      }
    ]
  }
]
