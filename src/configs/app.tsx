import type { ProLayoutProps } from "@ant-design/pro-components"

/**
 * Default settings for the Pro Layout
 */
const defaultSettings: ProLayoutProps & {
  pwa?: boolean
  logo?: string
} = {
  navTheme: "light",
  layout: "mix",
  contentWidth: "Fluid",
  fixedHeader: true,
  fixSiderbar: true,
  colorPrimary: "#1677ff",
  splitMenus: false,
  title: "CMI Admin",
  pwa: false,
  iconfontUrl: ""
}

export default defaultSettings
