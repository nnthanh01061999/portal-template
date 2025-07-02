import type { Meta, StoryObj } from "@storybook/react"

import DateTimeFormat from "@/components/formats/date-time-format"

const meta = {
  title: "Formats/DateTimeFormat",
  component: DateTimeFormat,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {
    value: { control: "date" },
    format: { control: "text" },
    fallback: { control: "text" },
    template: { control: "text" }
  }
} satisfies Meta<typeof DateTimeFormat>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    value: "2023-05-15T14:30:00Z"
  }
}

export const CustomFormat: Story = {
  args: {
    value: "2023-05-15T14:30:00Z",
    format: "DD/MM/YYYY"
  }
}

export const WithTemplate: Story = {
  args: {
    value: "2023-05-15T14:30:00Z",
    template: "Date: {value}"
  }
}

export const NoValue: Story = {
  args: {
    value: undefined,
    fallback: "No date specified"
  }
}

export const WithCopyable: Story = {
  args: {
    value: "2023-05-15T14:30:00Z",
    copyable: true
  }
}
