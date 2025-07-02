import type { Meta, StoryObj } from "@storybook/react"

import { LocaleSwitch } from "@/components/locale/locale-switch"

const meta = {
  title: "Locale/LocaleSwitch",
  component: LocaleSwitch,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A component for switching between different locales. Note: This component requires next-intl context to work properly."
      }
    }
  },
  tags: ["autodocs"]
} satisfies Meta<typeof LocaleSwitch>

export default meta
type Story = StoryObj<typeof meta>

// Note: This story is for documentation purposes only.
// The component requires next-intl context to work properly.
export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: "Default appearance of the locale switch button."
      }
    }
  }
}

export const WithCustomStyle: Story = {
  args: {
    style: { color: "blue" }
  },
  parameters: {
    docs: {
      description: {
        story: "Locale switch with custom styling for the icon."
      }
    }
  }
}
