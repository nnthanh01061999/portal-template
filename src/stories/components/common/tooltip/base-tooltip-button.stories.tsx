import type { Meta, StoryObj } from "@storybook/react"

import TooltipButton from "@/components/common/tooltip/base-tooltip-button"

const meta = {
  title: "Common/TooltipButton",
  component: TooltipButton,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {
    name: { control: "text" },
    type: {
      control: "select",
      options: ["primary", "default", "dashed", "link", "text"]
    },
    size: {
      control: "select",
      options: ["large", "middle", "small"]
    },
    disabled: { control: "boolean" }
  }
} satisfies Meta<typeof TooltipButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    name: "Default Button",
    children: "Hover Me"
  }
}

export const Primary: Story = {
  args: {
    name: "Primary Button",
    type: "primary",
    children: "Primary Button"
  }
}

export const Disabled: Story = {
  args: {
    name: "Disabled Button",
    disabled: true,
    children: "Disabled Button"
  }
}

export const Small: Story = {
  args: {
    name: "Small Button",
    size: "small",
    children: "Small Button"
  }
}
