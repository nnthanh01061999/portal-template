import type { Meta, StoryObj } from "@storybook/react"
import { Form } from "antd"

import TranslationInput from "@/components/common/translation-input"

const meta = {
  title: "Common/TranslationInput",
  component: TranslationInput,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Form
        initialValues={{
          translation: { name: { en: "English Name", vi: "Vietnamese Name" } }
        }}>
        <div style={{ width: "300px" }}>
          <Story />
        </div>
      </Form>
    )
  ],
  argTypes: {
    placeholder: { control: "text" },
    disabled: { control: "boolean" }
  }
} satisfies Meta<typeof TranslationInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    translationsProps: {
      name: "translation.name"
    },
    placeholder: "Enter name"
  }
}

export const Disabled: Story = {
  args: {
    translationsProps: {
      name: "translation.name"
    },
    placeholder: "Enter name",
    disabled: true
  }
}
