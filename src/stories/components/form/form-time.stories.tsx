import type { Meta, StoryObj } from "@storybook/react"
import { Form } from "antd"
import dayjs from "dayjs"

import FormTime from "@/components/forms/form-time"

const meta = {
  title: "Forms/FormTime",
  component: FormTime,
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
} satisfies Meta<typeof FormTime>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    config: {
      name: "time",
      componentType: "TIME",
      label: "Time"
    }
  }
}

export const Disabled: Story = {
  args: {
    config: {
      name: "time",
      componentType: "TIME",
      label: "Time"
    },
    disabled: true
  }
}

export const WithAllowClear: Story = {
  args: {
    config: {
      name: "time",
      componentType: "TIME",
      label: "Time",
      allowClear: true
    }
  }
}

export const WithCustomFormat: Story = {
  args: {
    config: {
      name: "time",
      componentType: "TIME",
      label: "Time",
      format: "HH:mm"
    }
  }
}

export const WithDefaultValue: Story = {
  args: {
    config: {
      name: "time",
      componentType: "TIME",
      label: "Time"
    },
    defaultValue: dayjs()
  }
}
