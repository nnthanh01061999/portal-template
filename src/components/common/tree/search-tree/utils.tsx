import { TreeDataNode } from "antd"

import { removeAccents } from "@/utils/search"

const formattedTextCache = new Map<string, string>()

const getFormattedText = (text: string): string => {
  if (!text) return ""

  if (formattedTextCache.has(text)) {
    return formattedTextCache.get(text)!
  }

  const formatted = removeAccents(text).toLowerCase()
  formattedTextCache.set(text, formatted)
  return formatted
}

export const filterTree = (
  data: TreeDataNode[],
  keyword: string
): { tree: TreeDataNode[]; expandedKeys: React.Key[] } => {
  if (!keyword || !data || data.length === 0) {
    return {
      tree: data || [],
      expandedKeys: []
    }
  }

  const expandedKeys: React.Key[] = []
  const formattedKeyword = getFormattedText(keyword)

  const matchingKeys = new Set<React.Key>()
  const matchingPathMap = new Map<string, boolean>()

  const collectMatches = () => {
    const nodeStack: Array<{ node: TreeDataNode; path: string[] }> = data.map(
      (node) => ({
        node,
        path: [node.key as string]
      })
    )

    while (nodeStack.length > 0) {
      const { node, path } = nodeStack.pop()!
      const titleText =
        typeof node.title === "string" ? getFormattedText(node.title) : ""

      if (titleText.includes(formattedKeyword)) {
        matchingKeys.add(node.key)

        for (let i = 1; i <= path.length; i++) {
          const pathKey = path.slice(0, i).join("->")
          matchingPathMap.set(pathKey, true)
        }
      }

      if (node.children?.length) {
        for (let i = node.children.length - 1; i >= 0; i--) {
          const child = node.children[i]
          nodeStack.push({
            node: child,
            path: [...path, child.key as string]
          })
        }
      }
    }
  }

  collectMatches()

  const buildFiltered = (nodes: TreeDataNode[]): TreeDataNode[] => {
    const result: TreeDataNode[] = []

    for (const node of nodes) {
      if (
        !matchingKeys.has(node.key) &&
        !hasMatchingDescendant(node, matchingKeys)
      ) {
        continue
      }

      const titleText =
        typeof node.title === "string" ? getFormattedText(node.title) : ""
      const isMatch = titleText.includes(formattedKeyword)

      if (isMatch) {
        expandedKeys.push(node.key)
      }

      const children = node.children?.length ? buildFiltered(node.children) : []

      result.push({
        ...node,
        title: isMatch
          ? getHighlightTitle(node.title as string, keyword)
          : node.title,
        children: children.length ? children : node.children
      })
    }

    return result
  }

  return {
    tree: buildFiltered(data),
    expandedKeys
  }
}

const hasMatchingDescendant = (
  node: TreeDataNode,
  matchingKeys: Set<React.Key>
): boolean => {
  if (!node.children?.length) return false

  const stack = [...node.children]
  while (stack.length > 0) {
    const current = stack.pop()!
    if (matchingKeys.has(current.key)) {
      return true
    }
    if (current.children?.length) {
      stack.push(...current.children)
    }
  }

  return false
}

const highlightCache = new Map<string, React.ReactNode>()

const getHighlightTitle = (title: string, keyword: string) => {
  if (typeof title !== "string") return title

  const cacheKey = `${title}:${keyword}`
  if (highlightCache.has(cacheKey)) {
    return highlightCache.get(cacheKey)
  }

  const index = getFormattedText(title).indexOf(getFormattedText(keyword))

  if (index === -1) {
    const result = <span>{title}</span>
    highlightCache.set(cacheKey, result)
    return result
  }

  const prefix = title.slice(0, index)
  const highlight = title.slice(index, index + keyword.length)
  const suffix = title.slice(index + keyword.length)

  const result = (
    <span>
      {prefix}
      <span className="bg-yellow-200">{highlight}</span>
      {suffix}
    </span>
  )

  highlightCache.set(cacheKey, result)
  return result
}
