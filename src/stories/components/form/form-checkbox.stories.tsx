import type { Meta, StoryObj } from "@storybook/react"
import { Form } from "antd"

import FormCheckbox from "@/components/forms/form-checkbox"

const meta = {
  title: "Forms/FormCheckbox",
  component: FormCheckbox,
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
} satisfies Meta<typeof FormCheckbox>

export default meta
type Story = StoryObj<typeof meta>

const options = [
  { label: "Option 1", value: "option1" },
  { label: "Option 2", value: "option2" },
  { label: "Option 3", value: "option3" }
]

export const Default: Story = {
  args: {
    config: {
      name: "checkboxGroup",
      componentType: "CHECKBOX",
      label: "Checkbox Group"
    },
    options
  }
}

export const Disabled: Story = {
  args: {
    config: {
      name: "checkboxGroup",
      componentType: "CHECKBOX",
      label: "Checkbox Group",
      disabled: true
    },
    options
  }
}

export const WithDefaultValue: Story = {
  args: {
    config: {
      name: "checkboxGroup",
      componentType: "CHECKBOX",
      label: "Checkbox Group"
    },
    options,
    defaultValue: ["option1"]
  }
}
