import { EditOutlined, SettingOutlined } from "@ant-design/icons"
import type { Meta, StoryObj } from "@storybook/react"
import { FloatButton } from "antd"

import FloatActionButton from "@/components/layout/float-action-button"

const meta = {
  title: "Layout/FloatActionButton",
  component: FloatActionButton,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
} satisfies Meta<typeof FloatActionButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    tooltip: "Add New"
  }
}

export const WithCustomIcon: Story = {
  args: {
    icon: <EditOutlined />,
    tooltip: "Edit"
  }
}

export const WithChildren: Story = {
  args: {
    tooltip: "Actions",
    children: (
      <>
        <FloatButton icon={<EditOutlined />} tooltip="Edit" />
        <FloatButton icon={<SettingOutlined />} tooltip="Settings" />
      </>
    )
  }
}

export const SquareShape: Story = {
  args: {
    shape: "square",
    tooltip: "Add New"
  }
}

export const DefaultType: Story = {
  args: {
    type: "default",
    tooltip: "Add New"
  }
}
