import type { Meta, StoryObj } from "@storybook/react"

import { PageSkeleton } from "@/components/layout/page-skeleton"

const meta = {
  title: "Layout/PageSkeleton",
  component: PageSkeleton,
  parameters: {
    layout: "fullscreen"
  },
  tags: ["autodocs"]
} satisfies Meta<typeof PageSkeleton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {}
}
