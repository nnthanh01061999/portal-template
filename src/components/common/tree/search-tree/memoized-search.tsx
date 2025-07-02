import { Input, Space } from "antd"
import { useTranslations } from "next-intl"
import { memo } from "react"

const { Search } = Input

const MemoizedSearch = memo(
  ({
    value,
    onChange,
    onSearch
  }: {
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onSearch: (value: string) => void
  }) => {
    const t = useTranslations("Form")
    return (
      <div className="flex justify-end">
        <Space>
          <Search
            placeholder={t("please_enter")}
            value={value}
            onChange={onChange}
            onSearch={onSearch}
            allowClear
          />
        </Space>
      </div>
    )
  }
)

MemoizedSearch.displayName = "MemoizedSearch"

export default MemoizedSearch
