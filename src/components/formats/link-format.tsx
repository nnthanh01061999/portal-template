import StringFormat, {
  TStringFormatProps
} from "@/components/formats/string-format"
import { Link } from "@/i18n"
import { cn } from "@/lib/utils"

type TLinkFormatProps = TStringFormatProps & {
  link: React.ComponentPropsWithoutRef<typeof Link>
}

function LinkFormat({ link, value, ...props }: TLinkFormatProps) {
  const element = (
    <StringFormat
      value={value}
      {...props}
      className={cn(["text-inherit", props.className])}
    />
  )
  return value ? <Link {...link}>{element}</Link> : element
}

export default LinkFormat
