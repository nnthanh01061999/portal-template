import {
  TAudit,
  TBaseModel,
  TFilterParams,
  TTranslationModel
} from "@/types/api"

export type TTemplate = {
  id: string
  code: string
  name: string
  isActive: boolean
  translation: {
    name: TTranslationModel
  }
  audit: TAudit
}

export type TTemplateAdditionalData = {
  accounts: TBaseModel[]
}

export type TTemplateParams = TFilterParams<TTemplate>

export type TTemplateFormValues = {
  name: string
  code: string
  isActive: boolean
  translation: {
    name: TTranslationModel
  }
}
