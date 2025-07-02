import type { Meta, StoryObj } from "@storybook/react"

import FloatAction from "@/components/layout/float-action"

const meta = {
  title: "Layout/FloatAction",
  component: FloatAction,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A component that displays floating action buttons for locale switching and scrolling to top."
      }
    }
  },
  tags: ["autodocs"]
} satisfies Meta<typeof FloatAction>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story:
          "Default appearance of the float action component with locale switch and scroll to top buttons."
      }
    }
  }
}
