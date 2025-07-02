import { SelectProps } from "antd"
import { useTranslations } from "next-intl"
import { useMemo } from "react"

import TemplateTable from "@/app/[locale]/(admin)/template/components/template-table"
import BaseCard from "@/components/common/card/base-card"
import SearchForm from "@/components/forms/search-form"
import PageContent from "@/components/layout/page-content"
import PageWrapper from "@/components/layout/page-wrapper"
import { routeConfig } from "@/configs/routes"
import { useSearch } from "@/helpers/form"
import useLocaleHelper from "@/hooks/use-locale-helper"
import { TFormItemConfig, TTemplateFilter } from "@/types"

function TemplateListPage() {
  const t = useTranslations()

  const { getActiveOptions } = useLocaleHelper()

  const filterFields = useMemo(
    () =>
      [
        {
          name: "filter.keyword",
          label: t("Filter.keyword"),
          componentType: "INPUT"
        },
        {
          name: "filter.codes",
          label: t("Filter.code"),
          componentType: "INPUT"
        },
        {
          name: "filter.isActive",
          label: t("Filter.status"),
          componentType: "SELECT",
          childrenProps: {
            options: getActiveOptions(true)
          } satisfies SelectProps
        }
      ] satisfies TFormItemConfig<TTemplateFilter>[],
    [t, getActiveOptions]
  )

  const { onSearch, onClear, initValues } = useSearch<TTemplateFilter>({
    fields: filterFields
  })

  return (
    <PageWrapper
      breadcrumb={{
        items: [
          {
            title: t("Common.home"),
            href: routeConfig.home
          },
          {
            title: t("Template.title"),
            href: routeConfig.template.list
          }
        ]
      }}
      title={t("Template.title")}
      filter={
        <SearchForm<TTemplateFilter>
          fields={filterFields}
          values={initValues}
          onSubmit={onSearch}
          onClear={onClear}
        />
      }>
      <PageContent>
        <BaseCard>
          <TemplateTable />
        </BaseCard>
      </PageContent>
    </PageWrapper>
  )
}

export default TemplateListPage
