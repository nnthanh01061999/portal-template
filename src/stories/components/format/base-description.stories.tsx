import type { Meta, StoryObj } from "@storybook/react"

import BaseDescriptions from "@/components/formats/base-description"

const meta = {
  title: "Formats/BaseDescriptions",
  component: BaseDescriptions,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {
    layout: { control: "select", options: ["horizontal", "vertical"] },
    bordered: { control: "boolean" },
    column: { control: "object" }
  }
} satisfies Meta<typeof BaseDescriptions>

export default meta
type Story = StoryObj<typeof meta>

export const Horizontal: Story = {
  args: {
    layout: "horizontal",
    items: [
      {
        label: "Name",
        children: "John Doe"
      },
      {
        label: "Email",
        children: "john.doe@example.com"
      },
      {
        label: "Phone",
        children: "123-456-7890"
      },
      {
        label: "Address",
        children: "123 Main St, Anytown, USA"
      }
    ]
  }
}

export const Vertical: Story = {
  args: {
    layout: "vertical",
    items: [
      {
        label: "Name",
        children: "John Doe"
      },
      {
        label: "Email",
        children: "john.doe@example.com"
      },
      {
        label: "Phone",
        children: "123-456-7890"
      },
      {
        label: "Address",
        children: "123 Main St, Anytown, USA"
      }
    ]
  }
}

export const Bordered: Story = {
  args: {
    bordered: true,
    items: [
      {
        label: "Name",
        children: "John Doe"
      },
      {
        label: "Email",
        children: "john.doe@example.com"
      }
    ]
  }
}

export const CustomColumns: Story = {
  args: {
    column: { xs: 1, sm: 2, md: 3 },
    items: [
      {
        label: "Name",
        children: "John Doe"
      },
      {
        label: "Email",
        children: "john.doe@example.com"
      },
      {
        label: "Phone",
        children: "123-456-7890"
      },
      {
        label: "Address",
        children: "123 Main St, Anytown, USA"
      },
      {
        label: "Department",
        children: "Engineering"
      },
      {
        label: "Position",
        children: "Senior Developer"
      }
    ]
  }
}
