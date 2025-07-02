import type { Meta, StoryObj } from "@storybook/react"
import { DescriptionsProps } from "antd"

import CollapseCell from "@/components/table/components/mobile/collapse-cell"
import { TTableColumn, TTree } from "@/types"

// Sample data for the story
interface UserData extends TTree {
  key: string
  name: string
  age: number
  address: string
  email: string
  phone: string
  department: string
  position: string
}

const sampleUser: UserData = {
  key: "1",
  name: "John Brown",
  age: 32,
  address: "New York No. 1 Lake Park",
  email: "john.brown@example.com",
  phone: "+1 (555) 123-4567",
  department: "Engineering",
  position: "Senior Developer"
}

// Define columns for different groups
const generalColumns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    cellGroup: "general"
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
    cellGroup: "general"
  }
] as TTableColumn<UserData>

const contactColumns = [
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    cellGroup: "contact"
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
    cellGroup: "contact"
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
    cellGroup: "contact"
  }
] as TTableColumn<UserData>

const workColumns = [
  {
    title: "Department",
    dataIndex: "department",
    key: "department",
    cellGroup: "work"
  },
  {
    title: "Position",
    dataIndex: "position",
    key: "position",
    cellGroup: "work"
  }
] as TTableColumn<UserData>

// Convert general columns to description items
const generalItems = generalColumns.map((column) => ({
  key: column.key as string,
  label: column.title as string,
  children: sampleUser[column.dataIndex as keyof UserData]
}))

const meta = {
  title: "Table/CollapseCell",
  component: CollapseCell,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: "400px", padding: "20px" }}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof CollapseCell>

export default meta
type Story = StoryObj<typeof meta>

// Basic collapse cell with single group
export const SingleGroup: Story = {
  args: {
    generalItems: generalItems as DescriptionsProps["items"],
    value: sampleUser,
    record: sampleUser,
    index: 0,
    collapseGroups: {
      contact: contactColumns as TTableColumn<unknown>
    }
  }
}

// With multiple groups
export const MultipleGroups: Story = {
  args: {
    generalItems: generalItems as DescriptionsProps["items"],
    value: sampleUser,
    record: sampleUser,
    index: 0,
    collapseGroups: {
      contact: contactColumns as TTableColumn<unknown>,
      work: workColumns as TTableColumn<unknown>
    }
  }
}

// With custom description props
export const WithCustomDescriptionProps: Story = {
  args: {
    generalItems: generalItems as DescriptionsProps["items"],
    value: sampleUser,
    record: sampleUser,
    index: 0,
    collapseGroups: {
      contact: contactColumns as TTableColumn<unknown>,
      work: workColumns as TTableColumn<unknown>
    },
    descriptionProps: {
      className: "bg-gray-50",
      size: "small" as const,
      bordered: true
    }
  }
}
