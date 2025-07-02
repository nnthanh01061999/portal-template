import type { Meta, StoryObj } from "@storybook/react"
import { Form } from "antd"
import dayjs from "dayjs"

import FormDate from "@/components/forms/form-date"

const meta = {
  title: "Forms/FormDate",
  component: FormDate,
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
} satisfies Meta<typeof FormDate>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    config: {
      name: "date",
      componentType: "DATE",
      label: "Date",
      placeholder: "Select date"
    }
  }
}

export const Disabled: Story = {
  args: {
    config: {
      name: "date",
      componentType: "DATE",
      label: "Date",
      disabled: true,
      placeholder: "Select date"
    }
  }
}

export const WithAllowClear: Story = {
  args: {
    config: {
      name: "date",
      componentType: "DATE",
      label: "Date",
      allowClear: true,
      placeholder: "Select date"
    }
  }
}

export const WithCustomFormat: Story = {
  args: {
    config: {
      name: "date",
      componentType: "DATE",
      label: "Date",
      placeholder: "Select date",
      format: "DD/MM/YYYY"
    }
  }
}

export const WithDefaultValue: Story = {
  args: {
    config: {
      name: "date",
      componentType: "DATE",
      label: "Date",
      placeholder: "Select date"
    },
    defaultValue: dayjs()
  }
}

export const SearchForm: Story = {
  args: {
    formType: "search",
    config: {
      name: "date",
      componentType: "DATE",
      label: "Date",
      placeholder: "Select date"
    }
  }
}
