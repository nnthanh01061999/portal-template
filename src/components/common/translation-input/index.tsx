import { GlobalOutlined } from "@ant-design/icons"
import { Form, Input, InputProps } from "antd"

import TranslationDrawer from "@/components/common/translation-input/translation-drawer"
import useOpen from "@/hooks/use-open"
import { cn } from "@/lib/utils"

type TTranslationInputProps = InputProps & {
  translationsProps: {
    name: string
  }
}

function TranslationInput({
  translationsProps,
  className,
  disabled,
  ...props
}: TTranslationInputProps) {
  const { name } = translationsProps
  const { open, onClose, onOpen } = useOpen()

  return (
    <>
      <Input
        {...props}
        disabled={disabled}
        className={cn(["[&_.ant-input-group-addon]:px-0", className])}
        addonAfter={
          <GlobalOutlined
            onClick={() => {
              if (disabled) return
              onOpen()
            }}
            name="globalOutlined"
            className="cursor-pointer h-full w-full px-2"
          />
        }
      />
      <Form.Item name={name} noStyle>
        <TranslationDrawer name={name} open={open} onClose={onClose} />
      </Form.Item>
    </>
  )
}

export default TranslationInput
