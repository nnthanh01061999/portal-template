import type { Meta, StoryObj } from "@storybook/react"

import SearchTree from "@/components/common/tree/search-tree"
import { TBaseModel, TTree } from "@/types"

// Sample tree data for the stories
const sampleTreeData: TTree<TBaseModel>[] = [
  {
    id: "1",
    code: "P1",
    name: "Parent 1",
    children: [
      {
        id: "1-1",
        code: "C1-1",
        name: "Child 1-1",
        children: [
          {
            id: "1-1-1",
            code: "GC1-1-1",
            name: "Grandchild 1-1-1"
          },
          {
            id: "1-1-2",
            code: "GC1-1-2",
            name: "Grandchild 1-1-2"
          }
        ]
      },
      {
        id: "1-2",
        code: "C1-2",
        name: "Child 1-2"
      }
    ]
  },
  {
    id: "2",
    code: "P2",
    name: "Parent 2",
    children: [
      {
        id: "2-1",
        code: "C2-1",
        name: "Child 2-1"
      },
      {
        id: "2-2",
        code: "C2-2",
        name: "Child 2-2"
      }
    ]
  },
  {
    id: "3",
    code: "P3",
    name: "Parent 3"
  }
]

const meta = {
  title: "Common/SearchTree",
  component: SearchTree,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {
    data: { control: "object" },
    value: { control: "object" }
  }
} satisfies Meta<typeof SearchTree>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    data: sampleTreeData,
    value: []
  },
  render: (args) => (
    <div style={{ width: "300px", height: "400px" }}>
      <SearchTree {...args} />
    </div>
  )
}

export const WithSelectedValues: Story = {
  args: {
    data: sampleTreeData,
    value: ["1-1", "2-2"]
  },
  render: (args) => (
    <div style={{ width: "300px", height: "400px" }}>
      <SearchTree {...args} />
    </div>
  )
}

export const EmptyTree: Story = {
  args: {
    data: [],
    value: []
  },
  render: (args) => (
    <div style={{ width: "300px", height: "400px" }}>
      <SearchTree {...args} />
    </div>
  )
}
