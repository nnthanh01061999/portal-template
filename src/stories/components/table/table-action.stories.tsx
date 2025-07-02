import { InfoCircleOutlined, QuestionCircleOutlined } from "@ant-design/icons"
import type { Meta, StoryObj } from "@storybook/react"
import { Button, Tooltip } from "antd"
import React from "react"

import TableAction from "@/components/table/components/table-action"

// Mock data for the record
const mockRecord = {
  id: 1,
  name: "John Doe",
  email: "john.doe@example.com"
}

const meta = {
  title: "Table/TableAction",
  component: TableAction,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {
    record: { control: "object" },
    onView: { action: "viewed" },
    onUpdate: { action: "updated" },
    onDelete: { action: "deleted" },
    isViewing: { control: "boolean" },
    isUpdating: { control: "boolean" },
    isDeleting: { control: "boolean" }
  }
} satisfies Meta<typeof TableAction>

export default meta
type Story = StoryObj<typeof meta>

// Basic actions
export const Default: Story = {
  args: {
    record: mockRecord,
    onView: (record) => console.log("View", record),
    onUpdate: (record) => console.log("Update", record),
    onDelete: (record) => console.log("Delete", record)
  }
}

// Only view action
export const ViewOnly: Story = {
  args: {
    record: mockRecord,
    onView: (record) => console.log("View", record)
  }
}

// Only edit action
export const EditOnly: Story = {
  args: {
    record: mockRecord,
    onUpdate: (record) => console.log("Update", record)
  }
}

// Only delete action
export const DeleteOnly: Story = {
  args: {
    record: mockRecord,
    onDelete: (record) => console.log("Delete", record)
  }
}

// With loading states - View loading
export const WithViewLoading: Story = {
  args: {
    record: mockRecord,
    onView: (record) => console.log("View", record),
    onUpdate: (record) => console.log("Update", record),
    onDelete: (record) => console.log("Delete", record),
    isViewing: true,
    isUpdating: false,
    isDeleting: false
  }
}

// With loading states - Update loading
export const WithUpdateLoading: Story = {
  args: {
    record: mockRecord,
    onView: (record) => console.log("View", record),
    onUpdate: (record) => console.log("Update", record),
    onDelete: (record) => console.log("Delete", record),
    isViewing: false,
    isUpdating: true,
    isDeleting: false
  }
}

// With loading states - Delete loading
export const WithDeleteLoading: Story = {
  args: {
    record: mockRecord,
    onView: (record) => console.log("View", record),
    onUpdate: (record) => console.log("Update", record),
    onDelete: (record) => console.log("Delete", record),
    isViewing: false,
    isUpdating: false,
    isDeleting: true
  }
}

// With custom button props
export const WithCustomButtonProps: Story = {
  args: {
    record: mockRecord,
    onView: (record) => console.log("View", record),
    onUpdate: (record) => console.log("Update", record),
    onDelete: (record) => console.log("Delete", record),
    viewProps: { className: "bg-blue-50 rounded px-2" },
    updateProps: { className: "bg-green-50 rounded px-2" },
    deleteProps: { className: "bg-red-50 rounded px-2" }
  }
}

// With custom button text
export const WithCustomButtonText: Story = {
  args: {
    record: mockRecord,
    onView: (record) => console.log("View", record),
    onUpdate: (record) => console.log("Update", record),
    onDelete: (record) => console.log("Delete", record),
    viewProps: { children: "View Details" },
    updateProps: { children: "Edit Record" },
    deleteProps: { children: "Remove" }
  }
}

// With prefix and suffix
export const WithPrefixAndSuffix: Story = {
  args: {
    record: mockRecord,
    onView: (record) => console.log("View", record),
    onUpdate: (record) => console.log("Update", record),
    onDelete: (record) => console.log("Delete", record),
    prefix: (
      <Button
        type="link"
        icon={<InfoCircleOutlined />}
        onClick={() => console.log("Info clicked")}
      />
    ),
    suffix: (
      <Tooltip title="More information">
        <Button
          type="link"
          icon={<QuestionCircleOutlined />}
          onClick={() => console.log("More info clicked")}
        />
      </Tooltip>
    )
  }
}
