import type { Meta, StoryObj } from "@storybook/react"

import PriceFormat from "@/components/formats/price-format"

const meta = {
  title: "Formats/PriceFormat",
  component: PriceFormat,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {
    value: { control: "number" },
    unit: { control: "text" },
    fallback: { control: "text" },
    template: { control: "text" },
    copyable: { control: "boolean" }
  }
} satisfies Meta<typeof PriceFormat>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    value: 1234.56
  }
}

export const WithDifferentCurrency: Story = {
  args: {
    value: 1234.56,
    unit: "$"
  }
}

export const WithTemplate: Story = {
  args: {
    value: 1234.56,
    template: "Price: {value}"
  }
}

export const WithCustomOptions: Story = {
  args: {
    value: 1234.56,
    options: {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0
    }
  }
}

export const NoValue: Story = {
  args: {
    value: undefined,
    fallback: "Price not available"
  }
}

export const WithCopyable: Story = {
  args: {
    value: 1234.56,
    copyable: true
  }
}
