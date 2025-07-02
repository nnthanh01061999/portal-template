import type { Meta, StoryObj } from "@storybook/react"

import PageContent from "@/components/layout/page-content"

const meta = {
  title: "Layout/PageContent",
  component: PageContent,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
} satisfies Meta<typeof PageContent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <div className="p-4 border border-gray-300 rounded">Page Content</div>
    )
  }
}

export const WithMultipleChildren: Story = {
  args: {
    children: (
      <>
        <div className="p-4 border border-gray-300 rounded">Section 1</div>
        <div className="p-4 border border-gray-300 rounded">Section 2</div>
        <div className="p-4 border border-gray-300 rounded">Section 3</div>
      </>
    )
  }
}

export const WithCustomClassName: Story = {
  args: {
    className: "bg-gray-100 p-4 rounded",
    children: (
      <div className="p-4 border border-gray-300 rounded">
        Custom Page Content
      </div>
    )
  }
}
