"use client"

import { VerticalAlignTopOutlined } from "@ant-design/icons"
import { FloatButton } from "antd"
import { useEffect, useState } from "react"

export type ScrollToTopProps = {
  scrollProps?: ScrollIntoViewOptions
  visibilityThreshold?: number
  position?: {
    right?: number
    bottom?: number
  }
}

function ScrollToTop({
  scrollProps,
  visibilityThreshold = 300,
  position = { right: 24, bottom: 24 }
}: ScrollToTopProps) {
  const [isVisible, setIsVisible] = useState<boolean>(false)

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
      ...scrollProps
    })
  }

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > visibilityThreshold)
    }

    window.addEventListener("scroll", toggleVisibility)
    // Initial check
    toggleVisibility()

    return () => {
      window.removeEventListener("scroll", toggleVisibility)
    }
  }, [visibilityThreshold])

  return (
    <FloatButton
      icon={<VerticalAlignTopOutlined />}
      onClick={scrollToTop}
      type="primary"
      tooltip="Back to top"
      style={{
        right: position.right,
        bottom: position.bottom,
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? "auto" : "none",
        transition: "opacity 0.3s ease, transform 0.3s ease",
        transform: isVisible ? "scale(1)" : "scale(0.8)"
      }}
    />
  )
}

export default ScrollToTop
