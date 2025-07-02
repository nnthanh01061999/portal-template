import type { Meta, StoryObj } from "@storybook/react"
import { Form } from "antd"

import FormTextArea from "@/components/forms/form-textarea"

const meta = {
  title: "Forms/FormTextArea",
  component: FormTextArea,
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
} satisfies Meta<typeof FormTextArea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    config: {
      name: "description",
      componentType: "TEXTAREA",
      label: "Description",
      placeholder: "Enter description"
    }
  }
}

export const Disabled: Story = {
  args: {
    config: {
      name: "description",
      componentType: "TEXTAREA",
      label: "Description",
      disabled: true,
      placeholder: "Enter description"
    }
  }
}

export const WithAllowClear: Story = {
  args: {
    config: {
      name: "description",
      componentType: "TEXTAREA",
      label: "Description",
      allowClear: true,
      placeholder: "Enter description"
    }
  }
}

export const WithRows: Story = {
  args: {
    config: {
      name: "description",
      componentType: "TEXTAREA",
      label: "Description",
      placeholder: "Enter description"
    },
    rows: 6
  }
}

export const SearchForm: Story = {
  args: {
    formType: "search",
    config: {
      name: "description",
      componentType: "TEXTAREA",
      label: "Description",
      placeholder: "Enter description"
    }
  }
}
