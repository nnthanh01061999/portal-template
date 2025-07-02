import type { Meta, StoryObj } from "@storybook/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import InfiniteSelect from "@/components/common/select/infinite-select"

// Create a react-query client for the stories
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false
    }
  }
})

const meta = {
  title: "Common/InfiniteSelect",
  component: InfiniteSelect,
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <div style={{ width: "300px" }}>
          <Story />
        </div>
      </QueryClientProvider>
    )
  ],
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
    mode: {
      control: "select",
      options: [undefined, "multiple", "tags"]
    }
  }
} satisfies Meta<typeof InfiniteSelect>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: "Select an item",
    apiConfig: {
      apiKey: "mock/json-placeholder",
      responseKey: "",
      valueKey: "id",
      labelKey: "title",
      enabled: true,
      headers: {
        Authorization: "Bearer 1234567890"
      }
    }
  }
}

export const Multiple: Story = {
  args: {
    placeholder: "Select multiple items",
    mode: "multiple",
    apiConfig: {
      apiKey: "mock/json-placeholder",
      valueKey: "id",
      labelKey: "title",
      enabled: true,
      headers: {
        Authorization: "Bearer 1234567890"
      },
      responseKey: ""
    }
  }
}

export const WithSearch: Story = {
  args: {
    placeholder: "Search and select",
    apiConfig: {
      apiKey: "mock/json-placeholder",
      valueKey: "id",
      labelKey: "title",
      enabled: true,
      search: {
        searchThreshold: 1,
        searchKey: "keyword"
      },
      headers: {
        Authorization: "Bearer 1234567890"
      },
      responseKey: ""
    }
  }
}

export const Disabled: Story = {
  args: {
    placeholder: "Disabled select",
    disabled: true,
    apiConfig: {
      apiKey: "mock/json-placeholder",
      valueKey: "id",
      labelKey: "title",
      responseKey: "",
      enabled: true,
      headers: {
        Authorization: "Bearer 1234567890"
      }
    }
  }
}
