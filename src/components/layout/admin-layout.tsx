"use client"

import { LockOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons"
import { ProLayout } from "@ant-design/pro-components"
import { Avatar, Dropdown, MenuProps, Space } from "antd"
import { useTranslations } from "next-intl"
import React, { useCallback, useEffect } from "react"

import NotificationPermissionButton from "@/components/firebase/notification-permission-button"
import { LocaleSwitch } from "@/components/locale/locale-switch"
import defaultSettings from "@/configs/app"
import { menus } from "@/configs/menus"
import { routeConfig } from "@/configs/routes"
import { useResponsive } from "@/hooks/use-responsive"
import { usePathname, useRouter } from "@/i18n"
import { getLogout, getUser } from "@/stores/stores/auth"
import { useLayoutStore } from "@/stores/stores/layout"

interface AdminLayoutProps {
  children: React.ReactNode
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const t = useTranslations()
  const pathname = usePathname()
  const router = useRouter()
  const { collapsed, setCollapsed } = useLayoutStore()
  const { isMobile } = useResponsive()
  const user = getUser()
  const logout = getLogout()

  useEffect(() => {
    if (isMobile) {
      setCollapsed(true)
    }
  }, [isMobile, setCollapsed])

  const fallbackUser = {
    avatar:
      "https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"
  }

  const userMenuItems: MenuProps["items"] = [
    {
      key: "profile",
      label: t("Auth.profile"),
      icon: <UserOutlined />,
      onClick: () => router.push(`${routeConfig.auth.profile}?tab=general`)
    },
    {
      key: "change-password",
      label: t("Auth.change_password"),
      icon: <LockOutlined />,
      onClick: () =>
        router.push(`${routeConfig.auth.profile}?tab=change-password`)
    },
    {
      type: "divider"
    },
    {
      key: "logout",
      label: t("Auth.logout"),
      icon: <LogoutOutlined />,
      danger: true,
      onClick: () => {
        logout()
      }
    }
  ]

  const renderLogo = useCallback(() => {
    return (
      <div
        onClick={() => router.push(routeConfig.home)}
        className="flex items-center text-white gap-1 cursor-pointer">
        <span className="text-lg font-bold text-[#9AE67E]">CMI</span>
        <span className="text-lg font-bold">Admin</span>
      </div>
    )
  }, [router])

  const handleMenuItemClick = (path: string) => {
    router.push(path)

    if (isMobile) {
      setCollapsed(true)
    }
  }

  return (
    <ProLayout
      {...defaultSettings}
      logo={renderLogo()}
      isMobile={isMobile}
      collapsed={collapsed}
      title={defaultSettings.title}
      location={{ pathname }}
      menu={{ defaultOpenAll: true }}
      siderWidth={220}
      breakpoint="lg"
      onCollapse={setCollapsed}
      className="[&_.ant-layout-content]:!p-0 [&_.ant-pro-sider-logo]:!py-3 [&_.ant-pro-sider-logo]:!px-4 [&_.ant-pro-global-header-logo]:!py-3 [&_.ant-pro-global-header-logo]:!px-4"
      fixedHeader
      token={{
        header: {
          colorBgHeader: "#1677FF",
          colorHeaderTitle: "#fff",
          colorTextMenu: "#fff",
          colorTextMenuSecondary: "#fff",
          colorTextMenuSelected: "#fff",
          colorBgMenuItemSelected: "rgba(255,255,255,0.1)"
        },
        sider: {
          colorMenuBackground: "#fff",
          colorMenuItemDivider: "#f0f0f0"
        }
      }}
      headerTitleRender={(logo) => (
        <div className="flex items-center">{logo}</div>
      )}
      actionsRender={() => (
        <Space className="mr-4" size="middle">
          <NotificationPermissionButton className="text-white" />
          <LocaleSwitch style={{ color: "#fff" }} />
          <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
            <span className="flex cursor-pointer items-center">
              <Avatar
                size="small"
                src={fallbackUser.avatar}
                alt="avatar"
                icon={<UserOutlined style={{ color: "#fff" }} />}
              />
              <span className="ml-2 hidden text-white md:inline">
                {user?.name}
                {user?.code && ` (${user?.code})`}
              </span>
            </span>
          </Dropdown>
        </Space>
      )}
      route={{
        routes: menus
      }}
      menuItemRender={(item, dom) => {
        return (
          <div
            onClick={() => item.path && handleMenuItemClick(item.path)}
            className={`flex w-full items-center`}>
            {dom}
          </div>
        )
      }}>
      <div className="min-h-screen bg-gray-50">{children}</div>
    </ProLayout>
  )
}

export default AdminLayout
