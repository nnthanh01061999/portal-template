import type { ThemeConfig } from "antd"
import { theme } from "antd"

const { defaultAlgorithm } = theme

const themeConfig: ThemeConfig = {
  token: {
    colorPrimary: "#1677ff",
    borderRadius: 4
  },
  algorithm: defaultAlgorithm
}

export default themeConfig
