import type { Meta, StoryObj } from "@storybook/react"
import { Form } from "antd"

import FormInputNumber from "@/components/forms/form-input-number"

const meta = {
  title: "Forms/FormInputNumber",
  component: FormInputNumber,
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
} satisfies Meta<typeof FormInputNumber>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    config: {
      name: "amount",
      componentType: "NUMBER",
      label: "Amount",
      placeholder: "Enter amount"
    }
  }
}

export const Disabled: Story = {
  args: {
    config: {
      name: "amount",
      componentType: "NUMBER",
      label: "Amount",
      disabled: true,
      placeholder: "Enter amount"
    }
  }
}

export const WithDefaultValue: Story = {
  args: {
    config: {
      name: "amount",
      componentType: "NUMBER",
      label: "Amount",
      placeholder: "Enter amount"
    },
    defaultValue: 1000
  }
}

export const SearchForm: Story = {
  args: {
    formType: "search",
    config: {
      name: "amount",
      componentType: "NUMBER",
      label: "Amount",
      placeholder: "Enter amount"
    }
  }
}
