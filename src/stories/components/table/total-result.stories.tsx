import type { Meta, StoryObj } from "@storybook/react"

import TotalResult from "@/components/table/components/total-result"

const meta = {
  title: "Table/TotalResult",
  component: TotalResult,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {
    total: { control: "number" },
    type: {
      control: "select",
      options: ["secondary", "success", "warning", "danger"]
    },
    className: { control: "text" },
    copyable: { control: "boolean" }
  }
} satisfies Meta<typeof TotalResult>

export default meta
type Story = StoryObj<typeof meta>

// Single result
export const SingleResult: Story = {
  args: {
    total: 1
  }
}

// Multiple results
export const MultipleResults: Story = {
  args: {
    total: 42
  }
}

// Zero results
export const ZeroResults: Story = {
  args: {
    total: 0
  }
}

// Large number
export const LargeNumber: Story = {
  args: {
    total: 1234567
  }
}

// With secondary type
export const WithSecondaryType: Story = {
  args: {
    total: 42,
    type: "secondary"
  }
}

// With success type
export const WithSuccessType: Story = {
  args: {
    total: 42,
    type: "success"
  }
}

// With warning type
export const WithWarningType: Story = {
  args: {
    total: 42,
    type: "warning"
  }
}

// With danger type
export const WithDangerType: Story = {
  args: {
    total: 42,
    type: "danger"
  }
}

// With custom class name
export const WithCustomClassName: Story = {
  args: {
    total: 42,
    className: "text-lg font-bold"
  }
}

// With copyable
export const WithCopyable: Story = {
  args: {
    total: 42,
    copyable: true
  }
}
