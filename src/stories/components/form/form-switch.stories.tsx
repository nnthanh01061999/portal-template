import type { Meta, StoryObj } from "@storybook/react"
import { Form } from "antd"

import FormSwitch from "@/components/forms/form-switch"

const meta = {
  title: "Forms/FormSwitch",
  component: FormSwitch,
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
} satisfies Meta<typeof FormSwitch>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    config: {
      name: "switch",
      componentType: "SWITCH",
      label: "Switch"
    }
  }
}

export const Disabled: Story = {
  args: {
    config: {
      name: "switch",
      componentType: "SWITCH",
      label: "Switch",
      disabled: true
    }
  }
}

export const WithDefaultChecked: Story = {
  args: {
    config: {
      name: "switch",
      componentType: "SWITCH",
      label: "Switch"
    },
    defaultChecked: true
  }
}

export const WithCustomCheckedChildren: Story = {
  args: {
    config: {
      name: "switch",
      componentType: "SWITCH",
      label: "Switch"
    },
    checkedChildren: "ON",
    unCheckedChildren: "OFF"
  }
}

export const WithSize: Story = {
  args: {
    config: {
      name: "switch",
      componentType: "SWITCH",
      label: "Switch"
    },
    size: "small"
  }
}
