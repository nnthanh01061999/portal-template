import type { Meta, StoryObj } from "@storybook/react"

import GeneralTab from "@/components/common/tabs/general-tab"

const meta = {
  title: "Tabs/GeneralTab",
  component: GeneralTab,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {
    data: { control: "object" }
  }
} satisfies Meta<typeof GeneralTab>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    data: {
      id: "1",
      code: "TEMPLATE_001",
      name: "Sample Template",
      isActive: true,
      translation: {
        name: {
          en: "Sample Template",
          vi: "Mẫu Mẫu"
        }
      },
      audit: {
        isDeleted: false,
        createdBy: "John Doe",
        updatedBy: "John Doe",
        createdAt: "2023-01-01T00:00:00Z",
        updatedAt: "2023-01-01T00:00:00Z"
      }
    }
  }
}

export const NoData: Story = {
  args: {
    data: undefined
  }
}
