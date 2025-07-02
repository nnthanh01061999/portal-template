import type { Meta, StoryObj } from "@storybook/react"

import BaseTooltip from "@/components/common/tooltip/base-tooltip"

const meta = {
  title: "Common/BaseTooltip",
  component: BaseTooltip,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text" },
    color: { control: "color" },
    placement: {
      control: "select",
      options: ["top", "left", "right", "bottom"]
    }
  }
} satisfies Meta<typeof BaseTooltip>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: "This is a tooltip",
    children: (
      <button className="px-4 py-2 bg-blue-500 text-white rounded">
        Hover me
      </button>
    )
  }
}

export const CustomColor: Story = {
  args: {
    title: "Custom colored tooltip",
    color: "#ff4d4f",
    children: (
      <button className="px-4 py-2 bg-red-500 text-white rounded">
        Hover for red tooltip
      </button>
    )
  }
}

export const BottomPlacement: Story = {
  args: {
    title: "Tooltip appears below",
    placement: "bottom",
    children: (
      <button className="px-4 py-2 bg-green-500 text-white rounded">
        Hover me
      </button>
    )
  }
}
