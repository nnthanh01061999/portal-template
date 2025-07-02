import { PlusOutlined, SearchOutlined } from "@ant-design/icons"
import type { Meta, StoryObj } from "@storybook/react"
import { Button, Space } from "antd"

import LinkFormat from "@/components/formats/link-format"
import BaseTable from "@/components/table"
import TableAction from "@/components/table/components/table-action"
import { TTableColumn, TTree } from "@/types"

// Mock data for the table
interface DataType extends TTree {
  key: string
  name: string
  age: number
  address: string
  tags: string[]
  status?: "active" | "inactive" | "pending"
}

const data: DataType[] = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["developer", "react"],
    status: "active"
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["designer", "ui"],
    status: "inactive"
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
    tags: ["manager", "product"],
    status: "pending"
  },
  {
    key: "4",
    name: "Jim Red",
    age: 32,
    address: "London No. 2 Lake Park",
    tags: ["developer", "backend"],
    status: "active"
  }
]

// Generate more data for scrolling examples
const scrollData = [...Array(50)].map((_, index) => ({
  key: `${index + 5}`,
  name: `User ${index + 5}`,
  age: Math.floor(Math.random() * 50) + 18,
  address: `Address ${index + 5}`,
  tags: ["user"],
  status: ["active", "inactive", "pending"][index % 3] as DataType["status"]
}))

// Define columns for the table
const columns: TTableColumn<TTree> = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    responsiveOrder: 1,
    cellGroup: "general",
    render: (text) => (
      <LinkFormat
        value={text}
        link={{
          href: "#"
        }}
      />
    )
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
    responsiveOrder: 2,
    cellGroup: "general"
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
    responsiveOrder: 3,
    cellGroup: "contact"
  },
  {
    title: "Tags",
    key: "tags",
    dataIndex: "tags",
    responsiveOrder: 4,
    cellGroup: "other",
    render: (tags: string[]) => (
      <>
        {tags.map((tag) => (
          <span
            key={tag}
            className="mr-1 px-2 py-1 text-xs rounded bg-blue-100 text-blue-800">
            {tag}
          </span>
        ))}
      </>
    )
  },
  {
    title: "Action",
    key: "action",
    align: "center",
    responsiveOrder: 5,
    cellGroup: "action",
    render: (_, record) => (
      <TableAction
        record={record}
        onView={(record) => console.log("View", record)}
        onUpdate={(record) => console.log("Update", record)}
        onDelete={(record) => console.log("Delete", record)}
      />
    )
  }
]

const meta = {
  title: "Table/BaseTable",
  component: BaseTable,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
} satisfies Meta<typeof BaseTable>

export default meta
type Story = StoryObj<typeof meta>

// Basic table story
export const Default: Story = {
  args: {
    columns,
    dataSource: data,
    headerProps: {
      name: "Users"
    },
    sticky: undefined
  }
}

// Table with pagination
export const WithPagination: Story = {
  args: {
    columns: columns,
    dataSource: data,
    headerProps: {
      name: "Users with Pagination",
      total: 50
    },
    pagination: {
      total: 50,
      current: 1,
      pageSize: 10
    },
    sticky: undefined
  }
}

// Table with actions
export const WithActions: Story = {
  args: {
    columns,
    dataSource: data,
    headerProps: {
      name: "Users with Actions",
      renderAction: () => (
        <Space>
          <Button icon={<SearchOutlined />}>Search</Button>
          <Button type="primary" icon={<PlusOutlined />}>
            Add User
          </Button>
        </Space>
      )
    },
    sticky: undefined
  }
}

// Table with row selection
export const WithRowSelection: Story = {
  args: {
    columns,
    dataSource: data,
    headerProps: {
      name: "Users with Row Selection"
    },
    rowSelection: {
      type: "checkbox",
      onChange: (selectedRowKeys, selectedRows) => {
        console.log("Selected row keys:", selectedRowKeys)
        console.log("Selected rows:", selectedRows)
      }
    },
    sticky: undefined
  }
}

// Empty table
export const EmptyTable: Story = {
  args: {
    columns,
    dataSource: [],
    headerProps: {
      name: "Empty Users Table"
    },
    sticky: undefined
  }
}

// Loading state
export const Loading: Story = {
  args: {
    columns,
    dataSource: data,
    headerProps: {
      name: "Loading Users"
    },
    loading: true,
    sticky: undefined
  }
}

// Responsive table with custom props
export const ResponsiveTable: Story = {
  args: {
    columns,
    dataSource: data,
    headerProps: {
      name: "Responsive Users Table"
    },
    responsiveProps: {
      descriptionProps: {
        size: "small",
        bordered: true
      }
    },
    sticky: undefined
  }
}

// Table with nested data
export const NestedTable: Story = {
  args: {
    columns,
    dataSource: [
      {
        ...data[0],
        children: [
          {
            key: "1-1",
            name: "John Brown Jr.",
            age: 12,
            address: "New York No. 1 Lake Park",
            tags: ["student"]
          } as DataType
        ]
      },
      ...data.slice(1)
    ],
    headerProps: {
      name: "Nested Users Table"
    },
    expandable: {
      defaultExpandAllRows: true
    },
    sticky: undefined
  }
}

// Table with sticky header
export const StickyHeader: Story = {
  args: {
    columns,
    dataSource: [...data, ...scrollData],
    headerProps: {
      name: "Sticky Header Table"
    },
    scroll: { y: 400 },
    pagination: {
      total: data.length + scrollData.length,
      pageSize: 10
    },
    sticky: undefined
  },
  decorators: [
    (Story) => (
      <div style={{ height: "500px", padding: "20px" }}>
        <Story />
      </div>
    )
  ]
}
