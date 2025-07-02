import type { Meta, StoryObj } from "@storybook/react"
import { Button, Space } from "antd"

import AntdProvider from "@/components/providers/antd-provider"

const meta = {
  title: "Providers/AntdProvider",
  component: AntdProvider,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A provider that configures Ant Design components with theme and localization settings."
      }
    }
  },
  tags: ["autodocs"]
} satisfies Meta<typeof AntdProvider>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <Space direction="vertical">
        <Button type="primary">Primary Button</Button>
        <Button>Default Button</Button>
        <Button type="dashed">Dashed Button</Button>
        <Button type="text">Text Button</Button>
        <Button type="link">Link Button</Button>
      </Space>
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          "AntdProvider with English locale (default) and theme configuration applied to Ant Design components."
      }
    }
  }
}
