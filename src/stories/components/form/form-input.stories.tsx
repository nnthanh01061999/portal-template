import type { Meta, StoryObj } from "@storybook/react"
import { Form } from "antd"

import FormInput from "@/components/forms/form-input"

const meta = {
  title: "Forms/FormInput",
  component: FormInput,
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
} satisfies Meta<typeof FormInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    config: {
      name: "username",
      componentType: "INPUT",
      label: "Username",
      placeholder: "Enter your username"
    }
  }
}

export const Disabled: Story = {
  args: {
    config: {
      name: "username",
      componentType: "INPUT",
      label: "Username",
      disabled: true,
      placeholder: "Enter your username"
    }
  }
}

export const WithAllowClear: Story = {
  args: {
    config: {
      name: "username",
      componentType: "INPUT",
      label: "Username",
      allowClear: true,
      placeholder: "Enter your username"
    }
  }
}

export const SearchForm: Story = {
  args: {
    formType: "search",
    config: {
      name: "username",
      componentType: "INPUT",
      label: "Username",
      placeholder: "Enter your username"
    }
  }
}
