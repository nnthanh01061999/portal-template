import type { Meta, StoryObj } from "@storybook/react"

import ScrollToTop from "@/components/layout/scroll-to-top"

const meta = {
  title: "Layout/ScrollToTop",
  component: ScrollToTop,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A floating button that appears when the user scrolls down the page, allowing them to quickly return to the top."
      }
    }
  },
  tags: ["autodocs"]
} satisfies Meta<typeof ScrollToTop>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story:
          "Default appearance of the scroll to top button. Note: The button will only appear when scrolling down the page beyond the visibility threshold."
      }
    }
  }
}

export const CustomPosition: Story = {
  args: {
    position: { right: 50, bottom: 50 }
  },
  parameters: {
    docs: {
      description: {
        story: "Scroll to top button with custom positioning."
      }
    }
  }
}

export const LowerVisibilityThreshold: Story = {
  args: {
    visibilityThreshold: 100
  },
  parameters: {
    docs: {
      description: {
        story:
          "Scroll to top button that appears after scrolling only 100px (instead of the default 300px)."
      }
    }
  }
}

export const CustomScrollBehavior: Story = {
  args: {
    scrollProps: { behavior: "auto" }
  },
  parameters: {
    docs: {
      description: {
        story:
          "Scroll to top button with instant scrolling instead of smooth scrolling."
      }
    }
  }
}
