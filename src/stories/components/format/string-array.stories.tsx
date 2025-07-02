import type { Meta, StoryObj } from "@storybook/react"

import StringArray from "@/components/formats/string-array"

const meta = {
  title: "Formats/StringArray",
  component: StringArray,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {
    value: { control: "object" },
    keys: { control: "multi-select" },
    colon: { control: "text" },
    fallback: { control: "text" },
    copyPosition: { control: "select" }
  }
} satisfies Meta<typeof StringArray>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    value: {
      firstName: "John",
      lastName: "Doe"
    },
    keys: ["firstName", "lastName"]
  } as any
}

export const WithCopyable: Story = {
  args: {
    value: {
      firstName: "John",
      lastName: "Doe"
    },
    keys: ["firstName", "lastName"],
    copyable: true
  } as any
}

export const WithCopyableFirst: Story = {
  args: {
    value: {
      firstName: "John",
      lastName: "Doe"
    },
    keys: ["firstName", "lastName"],
    copyable: true,
    copyPosition: "first"
  } as any
}

export const NoValue: Story = {
  args: {
    value: undefined,
    keys: ["firstName", "lastName"]
  } as any
}
