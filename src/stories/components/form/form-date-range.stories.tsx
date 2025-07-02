import type { Meta, StoryObj } from "@storybook/react"
import { Form } from "antd"
import dayjs from "dayjs"

import FormDateRange from "@/components/forms/form-date-range"

const meta = {
  title: "Forms/FormDateRange",
  component: FormDateRange,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Form style={{ width: "400px" }}>
        <Story />
      </Form>
    )
  ]
} satisfies Meta<typeof FormDateRange>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    config: {
      name: "dateRange",
      componentType: "DATE_RANGE",
      label: "Date Range"
    }
  }
}

export const Disabled: Story = {
  args: {
    config: {
      name: "dateRange",
      componentType: "DATE_RANGE",
      label: "Date Range",
      disabled: true
    }
  }
}

export const WithAllowClear: Story = {
  args: {
    config: {
      name: "dateRange",
      componentType: "DATE_RANGE",
      label: "Date Range",
      allowClear: true
    }
  }
}

export const WithCustomFormat: Story = {
  args: {
    config: {
      name: "dateRange",
      componentType: "DATE_RANGE",
      label: "Date Range",
      format: "DD/MM/YYYY"
    }
  }
}

export const WithDefaultValue: Story = {
  args: {
    config: {
      name: "dateRange",
      componentType: "DATE_RANGE",
      label: "Date Range"
    },
    defaultValue: [dayjs().subtract(7, "day"), dayjs()]
  }
}
