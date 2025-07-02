import type { Meta, StoryObj } from "@storybook/react"
import { Form } from "antd"
import { useState } from "react"

import TranslationDrawer from "@/components/common/translation-input/translation-drawer"

const TranslationDrawerWithState = (props: any) => {
  const [open, setOpen] = useState(true)
  return (
    <Form>
      <TranslationDrawer
        {...props}
        open={open}
        onClose={() => setOpen(false)}
      />
    </Form>
  )
}

const meta = {
  title: "Common/TranslationDrawer",
  component: TranslationDrawerWithState,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {
    name: { control: "text" },
    value: { control: "object" }
  }
} satisfies Meta<typeof TranslationDrawerWithState>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    name: "translation.name",
    value: {
      en: "English Name",
      vi: "Vietnamese Name",
      ja: "Japanese Name",
      ko: "Korean Name"
    }
  }
}

export const EmptyValues: Story = {
  args: {
    name: "translation.name",
    value: {}
  }
}
