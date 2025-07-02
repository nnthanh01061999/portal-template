import type { NextConfig } from "next"
import createNextIntlPlugin from "next-intl/plugin"

const withNextIntl = createNextIntlPlugin()

const nextConfig: NextConfig = {
  transpilePackages: ["@ant-design/pro-components"]
}

export default withNextIntl(nextConfig)
