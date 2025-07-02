import type { Meta, StoryObj } from "@storybook/react"

import DescriptionsFormat from "@/components/formats/descriptions-format"

const meta = {
  title: "Formats/DescriptionsFormat",
  component: DescriptionsFormat,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {
    items: { control: "object" },
    colon: { control: "boolean" },
    valueAlign: { control: "select", options: ["start", "end"] }
  }
} satisfies Meta<typeof DescriptionsFormat>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    items: [
      {
        label: "Name",
        children: "John Doe"
      },
      {
        label: "Email",
        children: "john.doe@example.com"
      },
      {
        label: "Phone",
        children: "123-456-7890"
      }
    ]
  }
}

export const WithoutColon: Story = {
  args: {
    colon: false,
    items: [
      {
        label: "Name",
        children: "John Doe"
      },
      {
        label: "Email",
        children: "john.doe@example.com"
      }
    ]
  }
}

export const EndAligned: Story = {
  args: {
    valueAlign: "end",
    items: [
      {
        label: "Name",
        children: "John Doe"
      },
      {
        label: "Email",
        children: "john.doe@example.com"
      }
    ]
  }
}

export const WithContainerClassName: Story = {
  args: {
    items: [
      {
        label: "Name",
        children: "John Doe",
        containerClassName: "bg-gray-100 p-2 rounded"
      },
      {
        label: "Email",
        children: "john.doe@example.com",
        containerClassName: "bg-blue-100 p-2 rounded"
      }
    ]
  }
}

export const WithConditionalItems: Story = {
  args: {
    items: [
      {
        label: "Name",
        children: "John Doe",
        condition: true
      },
      {
        label: "Hidden Field",
        children: "This should not appear",
        condition: false
      },
      {
        label: "Email",
        children: "john.doe@example.com",
        condition: true
      }
    ]
  }
}
