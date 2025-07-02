import type { Meta, StoryObj } from "@storybook/react"

import AuditFormat from "@/components/formats/audit-format"

const meta = {
  title: "Formats/AuditFormat",
  component: AuditFormat,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {
    value: { control: "object" },
    type: { control: "select", options: ["create", "update"] },
    fallback: { control: "text" }
  }
} satisfies Meta<typeof AuditFormat>

export default meta
type Story = StoryObj<typeof meta>

// Sample audit data
const auditData = {
  isDeleted: false,
  createdBy: "John Doe",
  updatedBy: "Jane Smith",
  createdAt: "2023-01-01T10:00:00Z",
  updatedAt: "2023-01-15T15:30:00Z"
}

export const Create: Story = {
  args: {
    value: auditData,
    type: "create"
  }
}

export const Update: Story = {
  args: {
    value: auditData,
    type: "update"
  }
}

export const WithCustomFallback: Story = {
  args: {
    value: {
      ...auditData,
      createdBy: null as unknown as string
    },
    type: "create",
    fallback: "Unknown"
  }
}

export const NoData: Story = {
  args: {
    value: undefined,
    fallback: "Not available"
  }
}
