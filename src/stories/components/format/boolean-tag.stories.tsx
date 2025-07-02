import type { Meta, StoryObj } from "@storybook/react"

import BooleanTag from "@/components/formats/boolean-tag"

const meta = {
  title: "Formats/BooleanTag",
  component: BooleanTag,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {
    value: { control: "boolean" },
    activeLabel: { control: "boolean" },
    colorTrue: { control: "text" },
    colorFalse: { control: "text" },
    fallback: { control: "text" }
  }
} satisfies Meta<typeof BooleanTag>

export default meta
type Story = StoryObj<typeof meta>

export const True: Story = {
  args: {
    value: true
  }
}

export const False: Story = {
  args: {
    value: false
  }
}

export const ActiveInactive: Story = {
  args: {
    value: true,
    activeLabel: true
  }
}

export const InactiveState: Story = {
  args: {
    value: false,
    activeLabel: true
  }
}

export const CustomColors: Story = {
  args: {
    value: true,
    colorTrue: "blue",
    colorFalse: "gray"
  }
}

export const NoValue: Story = {
  args: {
    value: undefined,
    fallback: "Not Available"
  }
}
