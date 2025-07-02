import type { Meta, StoryObj } from "@storybook/react"

import AuditSection from "@/components/common/sections/audit-section"

const meta = {
  title: "Sections/AuditSection",
  component: AuditSection,
  parameters: {
    data: {
      createdBy: "John Doe",
      createdAt: "2021-01-01",
      updatedBy: "Jane Doe",
      updatedAt: "2021-01-02"
    }
  },
  tags: ["autodocs"],
  argTypes: {
    data: { control: "object" },
    fallback: { control: "text" }
  }
} satisfies Meta<typeof AuditSection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    data: {
      createdBy: "John Doe",
      createdAt: "2021-01-01",
      updatedBy: "Jane Doe",
      updatedAt: "2021-01-02",
      isDeleted: false
    }
  }
}
