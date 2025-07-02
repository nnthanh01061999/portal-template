import type { Meta, StoryObj } from "@storybook/react"

import BooleanIcon from "@/components/formats/boolean-icon"

const meta = {
  title: "Formats/BooleanIcon",
  component: BooleanIcon,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {
    value: { control: "boolean" },
    showFalse: { control: "boolean" }
  }
} satisfies Meta<typeof BooleanIcon>

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

export const FalseWithIcon: Story = {
  args: {
    value: false,
    showFalse: true
  }
}
