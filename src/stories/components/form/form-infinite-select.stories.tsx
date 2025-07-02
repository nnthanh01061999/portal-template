import type { Meta, StoryObj } from "@storybook/react"
import { Form } from "antd"

import FormInfiniteSelect from "@/components/forms/form-infinite-select"

const meta = {
  title: "Forms/FormInfiniteSelect",
  component: FormInfiniteSelect,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Form style={{ width: "300px" }}>
        <Story />
      </Form>
    )
  ]
} satisfies Meta<typeof FormInfiniteSelect>

export default meta
type Story = StoryObj<typeof meta>

// Mock data and API config for demonstration
const mockApiConfig = {
  apiKey: "template/index" as ApiKey,
  valueKey: "id",
  labelKey: "name",
  responseKey: "data.items",
  totalKey: "data.total",
  limit: 10,
  search: {
    searchKey: "keyword",
    searchThreshold: 0
  },
  enabled: false // Disable actual API calls in Storybook
}

// Mock options for display
const mockOptions = [
  { id: "1", name: "Option 1" },
  { id: "2", name: "Option 2" },
  { id: "3", name: "Option 3" }
]

export const Default: Story = {
  args: {
    config: {
      name: "infiniteSelect",
      componentType: "INFINITE_SELECT",
      label: "Infinite Select",
      placeholder: "Select an option"
    },
    apiConfig: mockApiConfig,
    options: mockOptions
  }
}

export const Disabled: Story = {
  args: {
    config: {
      name: "infiniteSelect",
      componentType: "INFINITE_SELECT",
      label: "Infinite Select",
      disabled: true,
      placeholder: "Select an option"
    },
    apiConfig: mockApiConfig,
    options: mockOptions
  }
}

export const WithAllowClear: Story = {
  args: {
    config: {
      name: "infiniteSelect",
      componentType: "INFINITE_SELECT",
      label: "Infinite Select",
      allowClear: true,
      placeholder: "Select an option"
    },
    apiConfig: mockApiConfig,
    options: mockOptions
  }
}

export const Multiple: Story = {
  args: {
    config: {
      name: "infiniteSelect",
      componentType: "INFINITE_SELECT",
      label: "Infinite Select",
      placeholder: "Select options"
    },
    apiConfig: mockApiConfig,
    options: mockOptions,
    mode: "multiple"
  }
}

export const SearchForm: Story = {
  args: {
    formType: "search",
    config: {
      name: "infiniteSelect",
      componentType: "INFINITE_SELECT",
      label: "Infinite Select",
      placeholder: "Select an option"
    },
    apiConfig: mockApiConfig,
    options: mockOptions
  }
}
