import { PropsWithChildren } from "react"

import { cn } from "@/lib/utils"

function PageContent({
  className,
  children,
  ...props
}: PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) {
  return (
    <div
      {...props}
      className={cn(
        "flex flex-col w-full gap-2 md:gap-4 mt-0 md:mt-4",
        className
      )}>
      {children}
    </div>
  )
}

export default PageContent
