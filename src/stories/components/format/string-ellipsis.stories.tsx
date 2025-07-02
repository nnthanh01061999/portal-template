import type { Meta, StoryObj } from "@storybook/react"

import StringEllipsis from "@/components/formats/string-ellipsis"

const meta = {
  title: "Formats/StringEllipsis",
  component: StringEllipsis,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {
    value: { control: "text" },
    fallback: { control: "text" },
    expandable: { control: "boolean" },
    copyable: { control: "boolean" },
    copyPosition: {
      control: "select",
      options: ["first", "last"]
    }
  }
} satisfies Meta<typeof StringEllipsis>

export default meta
type Story = StoryObj<typeof meta>

const longText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`

export const Default: Story = {
  args: {
    value: longText
  },
  render: (args) => (
    <div style={{ width: "300px" }}>
      <StringEllipsis {...args} />
    </div>
  )
}

export const NonExpandable: Story = {
  args: {
    value: longText,
    expandable: false
  },
  render: (args) => (
    <div style={{ width: "300px" }}>
      <StringEllipsis {...args} />
    </div>
  )
}

export const WithCopyable: Story = {
  args: {
    value: longText,
    copyable: true
  },
  render: (args) => (
    <div style={{ width: "300px" }}>
      <StringEllipsis {...args} />
    </div>
  )
}

export const WithCopyableFirst: Story = {
  args: {
    value: longText,
    copyable: true,
    copyPosition: "first"
  },
  render: (args) => (
    <div style={{ width: "300px" }}>
      <StringEllipsis {...args} />
    </div>
  )
}

export const NoValue: Story = {
  args: {
    value: undefined,
    fallback: "No text available"
  },
  render: (args) => (
    <div style={{ width: "300px" }}>
      <StringEllipsis {...args} />
    </div>
  )
}
