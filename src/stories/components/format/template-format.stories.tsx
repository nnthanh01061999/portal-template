import type { Meta, StoryObj } from "@storybook/react"

import TemplateFormat from "@/components/formats/template-format"

const meta = {
  title: "Formats/TemplateFormat",
  component: TemplateFormat,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {
    template: { control: "text" },
    value: { control: "object" },
    fallback: { control: "text" }
  }
} satisfies Meta<typeof TemplateFormat>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    template: "Hello, {name}!",
    value: {
      name: "John"
    }
  }
}

export const WithMultipleParams: Story = {
  args: {
    template: "{greeting}, {name}! Welcome to {platform}.",
    value: {
      greeting: "Hello",
      name: "John",
      platform: "Our Platform"
    }
  }
}

export const WithFallback: Story = {
  args: {
    template: "Hello, {name}! Your account: {account}",
    value: {
      name: "John",
      account: undefined
    },
    fallback: "N/A"
  }
}

export const EmptyValue: Story = {
  args: {
    template: "Hello, {name}!",
    value: {},
    fallback: "No data available"
  }
}

export const WithCopyable: Story = {
  args: {
    template: "User ID: {id}",
    value: {
      id: "12345"
    },
    copyable: true
  }
}
