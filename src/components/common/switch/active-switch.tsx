import { Switch, SwitchProps } from "antd"
import { useTranslations } from "next-intl"

import { useNotify } from "@/components/providers/notify-provider"
import useMutationApi from "@/hooks/query/use-mutation-api"
import { TBaseModel } from "@/types"

export type TActiveSwitchProps<T extends TBaseModel> = {
  apiKey: ApiKey
  record: T
  valueKey?: keyof T
  onUpdate: () => void
}
function ActiveSwitch<T extends TBaseModel>(props: TActiveSwitchProps<T>) {
  const { apiKey, record, onUpdate, valueKey = "is_active" } = props

  const t = useTranslations("Common")

  const { notify } = useNotify()

  const { mutate: updateStatus, isPending } = useMutationApi(apiKey, {
    pathVariables: { id: record.id || "" },
    onSuccess: () => {
      notify.success({
        message: t("update_successfully_message", {
          name: t("status").toLocaleLowerCase()
        })
      })
      onUpdate()
    },
    onError: () => {
      notify.error({
        message: t("update_failed_message", {
          name: t("status").toLocaleLowerCase()
        })
      })
    }
  })

  const handleChangeStatus: SwitchProps["onChange"] = () => {
    updateStatus({ [valueKey]: !record[valueKey as keyof T] })
  }

  return (
    <Switch
      disabled={isPending}
      loading={isPending}
      checked={!!record[valueKey as keyof T]}
      className="status-switch-button"
      onClick={handleChangeStatus}
    />
  )
}

export default ActiveSwitch
