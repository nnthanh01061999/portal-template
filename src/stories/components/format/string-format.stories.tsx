import type { Meta, StoryObj } from "@storybook/react"

import StringFormat from "@/components/formats/string-format"

const meta = {
  title: "Formats/StringFormat",
  component: StringFormat,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {
    value: { control: "text" },
    fallback: { control: "text" },
    copyable: { control: "boolean" },
    copyPosition: {
      control: "select",
      options: ["first", "last"]
    },
    type: {
      control: "select",
      options: ["secondary", "success", "warning", "danger"]
    }
  }
} satisfies Meta<typeof StringFormat>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    value: "Sample text"
  }
}

export const WithFallback: Story = {
  args: {
    value: undefined,
    fallback: "No data available"
  }
}

export const WithCopyable: Story = {
  args: {
    value: "This text can be copied",
    copyable: true
  }
}

export const WithCopyableFirst: Story = {
  args: {
    value: "Copy icon appears first",
    copyable: true,
    copyPosition: "first"
  }
}

export const WithSecondaryType: Story = {
  args: {
    value: "Secondary text style",
    type: "secondary"
  }
}
