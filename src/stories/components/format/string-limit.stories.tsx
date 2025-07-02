import type { Meta, StoryObj } from "@storybook/react"

import StringLimit from "@/components/formats/string-limit"

const meta = {
  title: "Formats/StringLimit",
  component: StringLimit,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {
    value: { control: "text" },
    fallback: { control: "text" },
    limit: { control: "number" },
    hideTitle: { control: "boolean" },
    copyable: { control: "boolean" },
    copyPosition: {
      control: "select",
      options: ["first", "last"]
    }
  }
} satisfies Meta<typeof StringLimit>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    value: "This is a short text"
  }
}

export const WithLimit: Story = {
  args: {
    value: "This is a longer text that will be truncated based on the limit",
    limit: 15
  }
}

export const WithHiddenTooltip: Story = {
  args: {
    value: "This is a longer text that will be truncated based on the limit",
    limit: 15,
    hideTitle: true
  }
}

export const WithCopyable: Story = {
  args: {
    value: "This is a longer text that will be truncated based on the limit",
    limit: 15,
    copyable: true
  }
}

export const WithCopyableFirst: Story = {
  args: {
    value: "This is a longer text that will be truncated based on the limit",
    limit: 15,
    copyable: true,
    copyPosition: "first"
  }
}

export const NoValue: Story = {
  args: {
    value: undefined,
    fallback: "No text available"
  }
}
