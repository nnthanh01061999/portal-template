import type { TreeDataNode, TreeProps } from "antd"
import { Empty } from "antd"
import React, { memo, useCallback, useMemo, useState } from "react"

import MemoizedSearch from "@/components/common/tree/search-tree/memoized-search"
import MemoizedTree from "@/components/common/tree/search-tree/memoized-tree"
import { filterTree } from "@/components/common/tree/search-tree/utils"
import { TBaseModel, TTree } from "@/types"

type SearchTreeProps = {
  data: TTree<TBaseModel>[]
  value?: string[]
  onChange?: (value: string[]) => void
}

const SearchTree = ({ data = [], value = [], onChange }: SearchTreeProps) => {
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([])
  const [searchValue, setSearchValue] = useState("")
  const [autoExpandParent, setAutoExpandParent] = useState(true)

  const onExpand = useCallback((newExpandedKeys: React.Key[]) => {
    setExpandedKeys(newExpandedKeys)
    setAutoExpandParent(false)
  }, [])

  const onSearch = useCallback((value: string) => {
    if (!value.trim()) {
      setSearchValue("")
      setAutoExpandParent(false)
      return
    }

    setSearchValue(value)
    setAutoExpandParent(true)
  }, [])

  const treeData = useMemo(() => {
    if (!data || data.length === 0) return []

    const traverse = (items: TTree<TBaseModel>[]): TreeDataNode[] => {
      return items
        ?.sort((a, b) => a.name.localeCompare(b.name))
        .map((item) => {
          if (item.children && item.children.length > 0) {
            return {
              key: item.id,
              title: item.name,
              children: traverse(item.children)
            }
          } else {
            return { key: item.id, title: item.name }
          }
        })
    }

    return traverse(data)
  }, [data])

  const treeDataFiltered = useMemo(() => {
    if (!searchValue) return treeData

    const { tree, expandedKeys: filteredExpandedKeys } = filterTree(
      treeData,
      searchValue
    )

    if (filteredExpandedKeys.length > 0) {
      setExpandedKeys(filteredExpandedKeys)
      setAutoExpandParent(true)
    }

    return tree
  }, [treeData, searchValue])

  const availableKeysMap = useMemo(() => {
    return getAvailableKeys(treeDataFiltered)
  }, [treeDataFiltered])

  const onCheck: TreeProps["onCheck"] = useCallback(
    (
      checkedKeysValue:
        | React.Key[]
        | { checked: React.Key[]; halfChecked: React.Key[] }
    ) => {
      if (!searchValue || !value.length) {
        onChange?.(checkedKeysValue as string[])
        return
      }

      const invisibleKeys = value.filter((item) => !availableKeysMap[item])

      const checkedValue = invisibleKeys
        .concat(checkedKeysValue as any)
        ?.map(String)

      onChange?.(checkedValue)
    },
    [searchValue, value, availableKeysMap, onChange]
  )

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue(e.target.value)
    },
    []
  )

  return (
    <div className="flex flex-col gap-4">
      <MemoizedSearch
        value={searchValue}
        onChange={handleSearchChange}
        onSearch={onSearch}
      />
      {treeDataFiltered.length > 0 ? (
        <MemoizedTree
          treeData={treeDataFiltered}
          expandedKeys={expandedKeys}
          autoExpandParent={autoExpandParent}
          checkedKeys={value}
          onExpand={onExpand}
          onCheck={onCheck}
        />
      ) : (
        <Empty />
      )}
    </div>
  )
}

const getAvailableKeys = (data: TreeDataNode[]) => {
  const list: Record<string, boolean> = {}
  const loop = (data: TreeDataNode[]) => {
    data.forEach((item) => {
      list[item.key as string] = true
      if (item.children) {
        loop(item.children)
      }
    })
  }

  loop(data)
  return list
}

export default memo(SearchTree)
