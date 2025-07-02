"use client"

import { PageContainer, PageContainerProps } from "@ant-design/pro-components"
import { Card, Space } from "antd"
import { Fragment } from "react"

import { useResponsive } from "@/hooks/use-responsive"
import { Link } from "@/i18n"
import { cn } from "@/lib/utils"

type PageWrapperProps = PageContainerProps & {
  filter?: React.ReactNode
  actions?: React.ReactNode
  loading?: boolean
}

const PageWrapper = ({
  children,
  filter,
  actions,
  loading,
  breadcrumb,
  header,
  className,
  ...props
}: PageWrapperProps) => {
  const { items = [], ...rest } = breadcrumb || {}

  const { isMobile } = useResponsive()

  const renderExtra = () => {
    const extra = header?.extra
    const filterComp = isMobile ? filter : null

    return (
      <Space size={16} align="center">
        {filterComp ? <Fragment key="filter">{filterComp}</Fragment> : null}
        {extra ? <Fragment key="extra">{extra}</Fragment> : null}
        {actions ? <Fragment key="actions">{actions}</Fragment> : null}
      </Space>
    )
  }

  return (
    <PageContainer
      loading={loading}
      className={cn([
        "[&_.ant-page-header]:px-6 [&_.ant-page-header]:py-4",
        "[&_.ant-page-header-heading-title]:text-lg [&_.ant-page-header-heading-title]:font-medium",
        "[&_.ant-page-header-heading]:mt-0",
        "[&_.ant-page-header]:pb-2 [&_.ant-page-header]:bg-white",
        "[&_.ant-breadcrumb]:pt-0",
        "[&_.ant-pro-page-container-children-container]:p-3 md:[&_.ant-pro-page-container-children-container]:p-4",
        "transition-all duration-300 ease-in-out",
        className
      ])}
      fixedHeader
      {...props}
      header={{
        breadcrumb: {
          ...rest,
          items,
          itemRender: (item) => {
            const last = items?.indexOf(item) === items.length - 1
            if (last || !item.href) return <span>{item.title}</span>
            return <Link href={item.href}>{item.title}</Link>
          }
        },
        extra: renderExtra(),
        ...header
      }}>
      {!isMobile && filter ? <Card>{filter}</Card> : null}
      {children}
    </PageContainer>
  )
}

export default PageWrapper
