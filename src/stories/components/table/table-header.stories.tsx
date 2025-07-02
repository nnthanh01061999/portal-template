import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SearchOutlined
} from "@ant-design/icons"
import type { Meta, StoryObj } from "@storybook/react"
import { Button, Space } from "antd"
import React from "react"

import TableHeader from "@/components/table/components/table-header"

const meta = {
  title: "Table/TableHeader",
  component: TableHeader,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {
    name: { control: "text" },
    total: { control: "number" },
    className: { control: "text" },
    menuMode: { control: "boolean" }
  },
  decorators: [
    (Story) => (
      <div style={{ width: "800px" }}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof TableHeader>

export default meta
type Story = StoryObj<typeof meta>

// Basic header with name
export const Default: Story = {
  args: {
    name: "Users"
  }
}

// With total results
export const WithTotalResults: Story = {
  args: {
    name: "Users",
    total: 42
  }
}

// With custom name renderer
export const WithCustomName: Story = {
  args: {
    renderName: () => (
      <div className="flex items-center gap-2">
        <span className="w-3 h-3 rounded-full bg-green-500"></span>
        <span className="font-bold">Active Users</span>
      </div>
    ),
    total: 42
  }
}

// With action buttons
export const WithActions: Story = {
  args: {
    name: "Users",
    total: 42,
    renderAction: () => (
      <Space>
        <Button icon={<SearchOutlined />}>Search</Button>
        <Button type="primary" icon={<PlusOutlined />}>
          Add User
        </Button>
      </Space>
    )
  }
}

// With action items
export const WithActionItems: Story = {
  args: {
    name: "Users",
    total: 42,
    actionItems: [
      {
        icon: <SearchOutlined />,
        children: "Search",
        onClick: () => console.log("Search clicked")
      },
      {
        icon: <PlusOutlined />,
        type: "primary",
        children: "Add User",
        onClick: () => console.log("Add User clicked")
      }
    ]
  }
}

// With menu mode
export const WithMenuMode: Story = {
  args: {
    name: "Users",
    total: 42,
    menuMode: true,
    actionItems: [
      {
        icon: <SearchOutlined />,
        children: "Search",
        onClick: () => console.log("Search clicked")
      },
      {
        icon: <PlusOutlined />,
        children: "Add User",
        onClick: () => console.log("Add User clicked")
      },
      {
        icon: <EditOutlined />,
        children: "Edit",
        onClick: () => console.log("Edit clicked")
      },
      {
        icon: <DeleteOutlined />,
        children: "Delete",
        danger: true,
        onClick: () => console.log("Delete clicked")
      }
    ]
  }
}

// With custom total result renderer
export const WithCustomTotalResult: Story = {
  args: {
    name: "Users",
    renderTotal: () => (
      <div className="ml-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
        42 active users
      </div>
    )
  }
}

// With custom class name
export const WithCustomClassName: Story = {
  args: {
    name: "Users",
    total: 42,
    className: "bg-gray-100 p-4 rounded-lg"
  }
}

// Empty header (should not render)
export const EmptyHeader: Story = {
  args: {}
}
