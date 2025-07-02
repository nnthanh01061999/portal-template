import type { Meta, StoryObj } from "@storybook/react"
import { useContext } from "react"

import HydrationProvider, {
  HydrationContext
} from "@/components/providers/hydration-provider"

// Sample component that uses the HydrationContext
const UserAgentDisplay = () => {
  const { userAgent } = useContext(HydrationContext)
  return <div>User Agent: {userAgent || "Not provided"}</div>
}

const meta = {
  title: "Providers/HydrationProvider",
  component: HydrationProvider,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A context provider for hydration-related data, particularly the user agent string."
      }
    }
  },
  tags: ["autodocs"]
} satisfies Meta<typeof HydrationProvider>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: <UserAgentDisplay />
  }
}

export const WithUserAgent: Story = {
  args: {
    userAgent: "Mozilla/5.0 (Example User Agent String)",
    children: <UserAgentDisplay />
  }
}
