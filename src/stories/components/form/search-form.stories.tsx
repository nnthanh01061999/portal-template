import type { Meta, StoryObj } from "@storybook/react"

import SearchForm from "@/components/forms/search-form"

const meta = {
  title: "Forms/SearchForm",
  component: SearchForm,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
} satisfies Meta<typeof SearchForm>

export default meta
type Story = StoryObj<typeof meta>

// Mock fields for the search form
const fields = [
  {
    name: "name",
    label: "Name",
    componentType: "INPUT",
    colSpan: 8
  },
  {
    name: "email",
    label: "Email",
    componentType: "INPUT",
    colSpan: 8
  },
  {
    name: "status",
    label: "Status",
    componentType: "SELECT",
    colSpan: 8,
    childrenProps: {
      options: [
        { label: "Active", value: "active" },
        { label: "Inactive", value: "inactive" }
      ]
    }
  }
] as any[]

// Mock advanced fields for the search form
const advancedFields = [
  {
    name: "createdAt",
    label: "Created Date",
    componentType: "DATE_RANGE",
    colSpan: 8
  },
  {
    name: "type",
    label: "Type",
    componentType: "SELECT",
    colSpan: 8,
    childrenProps: {
      options: [
        { label: "Type 1", value: "type1" },
        { label: "Type 2", value: "type2" },
        { label: "Type 3", value: "type3" }
      ]
    }
  }
] as any[]

export const Default: Story = {
  args: {
    fields,
    onSubmit: (values) => console.log("Form submitted with values:", values),
    onClear: () => console.log("Form cleared")
  }
}

export const WithAdvancedFields: Story = {
  args: {
    fields,
    advancedFields,
    onSubmit: (values) => console.log("Form submitted with values:", values),
    onClear: () => console.log("Form cleared")
  }
}

export const WithValues: Story = {
  args: {
    fields,
    advancedFields,
    values: {
      name: "John Doe",
      email: "john@example.com",
      status: "active"
    },
    onSubmit: (values) => console.log("Form submitted with values:", values),
    onClear: () => console.log("Form cleared")
  }
}

export const Loading: Story = {
  args: {
    fields,
    loading: true,
    onSubmit: (values) => console.log("Form submitted with values:", values),
    onClear: () => console.log("Form cleared")
  }
}

export const Disabled: Story = {
  args: {
    fields,
    disabled: true,
    onSubmit: (values) => console.log("Form submitted with values:", values),
    onClear: () => console.log("Form cleared")
  }
}

export const DrawerMode: Story = {
  args: {
    fields,
    advancedFields,
    drawerMode: true,
    onSubmit: (values) => console.log("Form submitted with values:", values),
    onClear: () => console.log("Form cleared")
  }
}
