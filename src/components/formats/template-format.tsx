import StringFormat, {
  TStringFormatProps
} from "@/components/formats/string-format"
import { Assign } from "@/types"
import { getStringFormat } from "@/utils/format"

export type TTemplateFormatUnion =
  | `${string}{${string}}${string}`
  | `${string}{${string}}`

export type ExtractTemplateParams<T extends string> =
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  T extends `${infer _Start}{${infer Param}}${infer Rest}`
    ? {
        [K in Param]: string | number | undefined
      } & ExtractTemplateParams<Rest>
    : { [key: string]: string | number | undefined }

export type TTemplateFormatProps<T extends TTemplateFormatUnion> = Assign<
  TStringFormatProps,
  {
    template: T
    value?: ExtractTemplateParams<T>
  }
>

function TemplateFormat<T extends TTemplateFormatUnion>(
  props: TTemplateFormatProps<T>
) {
  const { value, fallback = "--", template, ...textProps } = props

  const formattedValue = getStringFormat(value, template, fallback)

  return <StringFormat {...textProps} value={formattedValue} />
}

export default TemplateFormat
