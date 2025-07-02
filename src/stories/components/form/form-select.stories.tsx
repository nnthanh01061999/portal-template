import type { Meta, StoryObj } from "@storybook/react"
import { Form } from "antd"

import FormSelect from "@/components/forms/form-select"

const meta = {
  title: "Forms/FormSelect",
  component: FormSelect,
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
} satisfies Meta<typeof FormSelect>

export default meta
type Story = StoryObj<typeof meta>

const options = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" }
]

export const Default: Story = {
  args: {
    config: {
      name: "select",
      componentType: "SELECT",
      label: "Select",
      placeholder: "Select an option"
    },
    options
  }
}

export const Disabled: Story = {
  args: {
    config: {
      name: "select",
      componentType: "SELECT",
      label: "Select",
      disabled: true,
      placeholder: "Select an option"
    },
    options
  }
}

export const WithAllowClear: Story = {
  args: {
    config: {
      name: "select",
      componentType: "SELECT",
      label: "Select",
      allowClear: true,
      placeholder: "Select an option"
    },
    options
  }
}

export const Multiple: Story = {
  args: {
    config: {
      name: "select",
      componentType: "SELECT",
      label: "Select",
      placeholder: "Select options"
    },
    mode: "multiple",
    options
  }
}

export const SearchForm: Story = {
  args: {
    formType: "search",
    config: {
      name: "select",
      componentType: "SELECT",
      label: "Select",
      placeholder: "Select an option"
    },
    options
  }
}
