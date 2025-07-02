import type { Meta, StoryObj } from "@storybook/react"

import NumberFormat from "@/components/formats/number-format"

const meta = {
  title: "Formats/NumberFormat",
  component: NumberFormat,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {
    value: { control: "number" },
    fallback: { control: "text" },
    template: { control: "text" },
    copyable: { control: "boolean" }
  }
} satisfies Meta<typeof NumberFormat>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    value: 1234.56
  }
}

export const WithTemplate: Story = {
  args: {
    value: 1234.56,
    template: "Value: {value}"
  }
}

export const NoValue: Story = {
  args: {
    value: undefined,
    fallback: "No number available"
  }
}

export const WithCopyable: Story = {
  args: {
    value: 1234.56,
    copyable: true
  }
}

export const LargeNumber: Story = {
  args: {
    value: 1234567.89
  }
}
