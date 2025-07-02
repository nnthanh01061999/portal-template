import type { Meta, StoryObj } from "@storybook/react"

import GeneralSection from "@/components/common/sections/general-section"

const meta = {
  title: "Sections/GeneralSection",
  component: GeneralSection,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {
    data: { control: "object" }
  }
} satisfies Meta<typeof GeneralSection>

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

export const Inactive: Story = {
  args: {
    data: {
      id: "2",
      code: "TEMPLATE_002",
      name: "Inactive Template",
      isActive: false,
      translation: {
        name: {
          en: "Inactive Template",
          vi: "Mẫu Không Hoạt Động"
        }
      },
      audit: {
        isDeleted: false,
        createdBy: "Jane Doe",
        updatedBy: "Jane Doe",
        createdAt: "2023-01-02T00:00:00Z",
        updatedAt: "2023-01-02T00:00:00Z"
      }
    }
  }
}

export const NoData: Story = {
  args: {
    data: undefined
  }
}
