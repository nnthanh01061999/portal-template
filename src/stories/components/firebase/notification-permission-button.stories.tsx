import type { Meta, StoryObj } from "@storybook/react"

import NotificationPermissionButton from "@/components/firebase/notification-permission-button"

const meta = {
  title: "Firebase/NotificationPermissionButton",
  component: NotificationPermissionButton,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
} satisfies Meta<typeof NotificationPermissionButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {}
}

export const WithCustomClassName: Story = {
  args: {
    className: "bg-blue-100 p-2 rounded-full"
  }
}
