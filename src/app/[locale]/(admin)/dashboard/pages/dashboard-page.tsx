"use client"

import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  DollarOutlined,
  FileOutlined,
  ShoppingCartOutlined,
  UserOutlined
} from "@ant-design/icons"
import { Card, Col, Row, Statistic } from "antd"
import { useTranslations } from "next-intl"

import BaseCard from "@/components/common/card/base-card"
import PageWrapper from "@/components/layout/page-wrapper"
import BaseTable from "@/components/table"

export default function DashboardPage() {
  const t = useTranslations("Dashboard")

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age"
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address"
    },
    {
      title: "Action",
      key: "action",
      render: () => <a>View</a>
    }
  ]

  const data = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park"
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park"
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sydney No. 1 Lake Park"
    }
  ]

  return (
    <PageWrapper
      title={t("title")}
      breadcrumb={{
        items: [
          {
            title: "Home"
          },
          {
            path: "/dashboard",
            title: t("title")
          }
        ]
      }}>
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title={t("users")}
              value={1128}
              precision={0}
              valueStyle={{ color: "#1677ff" }}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title={t("orders")}
              value={93}
              precision={0}
              valueStyle={{ color: "#52c41a" }}
              prefix={<ShoppingCartOutlined />}
              suffix={<ArrowUpOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title={t("revenue")}
              value={9280}
              precision={2}
              valueStyle={{ color: "#1677ff" }}
              prefix={<DollarOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title={t("reports")}
              value={42}
              precision={0}
              valueStyle={{ color: "#faad14" }}
              prefix={<FileOutlined />}
              suffix={<ArrowDownOutlined style={{ color: "#cf1322" }} />}
            />
          </Card>
        </Col>
      </Row>

      <BaseCard title={t("recent_users")}>
        <BaseTable
          columns={columns}
          dataSource={data}
          pagination={{ pageSize: 5 }}
        />
      </BaseCard>
    </PageWrapper>
  )
}
