import { Tree, TreeDataNode, TreeProps } from "antd"
import { memo } from "react"

const MemoizedTree = memo(
  ({
    treeData,
    expandedKeys,
    autoExpandParent,
    checkedKeys,
    onExpand,
    onCheck
  }: {
    treeData: TreeDataNode[]
    expandedKeys: React.Key[]
    autoExpandParent: boolean
    checkedKeys: string[]
    onExpand: (keys: React.Key[]) => void
    onCheck: TreeProps["onCheck"]
  }) => (
    <Tree
      onExpand={onExpand}
      expandedKeys={expandedKeys}
      autoExpandParent={autoExpandParent}
      treeData={treeData}
      checkable
      checkedKeys={checkedKeys}
      onCheck={onCheck}
      virtual
      height={640}
      blockNode
    />
  )
)

MemoizedTree.displayName = "MemoizedTree"

export default MemoizedTree
