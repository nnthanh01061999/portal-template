import type { Meta, StoryObj } from "@storybook/react"

import PhoneFormat from "@/components/formats/phone-format"

const meta = {
  title: "Formats/PhoneFormat",
  component: PhoneFormat,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {
    value: { control: "text" },
    fallback: { control: "text" },
    copyable: { control: "boolean" }
  }
} satisfies Meta<typeof PhoneFormat>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    value: "1234567890"
  }
}

export const WithCountryCode: Story = {
  args: {
    value: "+84123456789"
  }
}

export const NoValue: Story = {
  args: {
    value: undefined,
    fallback: "No phone number"
  }
}

export const WithCopyable: Story = {
  args: {
    value: "1234567890",
    copyable: true
  }
}
