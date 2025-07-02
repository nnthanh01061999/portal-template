import type { Meta, StoryObj } from "@storybook/react"
import { Form } from "antd"

import FormRadio from "@/components/forms/form-radio"

const meta = {
  title: "Forms/FormRadio",
  component: FormRadio,
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
} satisfies Meta<typeof FormRadio>

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
      name: "radioGroup",
      componentType: "RADIO",
      label: "Radio Group"
    },
    options
  } as any
}

export const Disabled: Story = {
  args: {
    config: {
      name: "radioGroup",
      componentType: "RADIO",
      label: "Radio Group",
      disabled: true
    },
    options
  } as any
}

export const WithDefaultValue: Story = {
  args: {
    config: {
      name: "radioGroup",
      componentType: "RADIO",
      label: "Radio Group"
    },
    options,
    defaultValue: "option1"
  } as any
}

export const ButtonStyle: Story = {
  args: {
    config: {
      name: "radioGroup",
      componentType: "RADIO",
      label: "Radio Group"
    },
    options,
    optionType: "button",
    buttonStyle: "solid"
  } as any
}
