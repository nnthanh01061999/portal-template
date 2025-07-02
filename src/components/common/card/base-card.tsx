import { Card, CardProps } from "antd"

import { cn } from "@/lib/utils"

function BaseCard(props: CardProps) {
  return (
    <Card
      {...props}
      classNames={{
        ...props.classNames,
        body: cn(props.classNames?.body, "p-0 md:p-6")
      }}
    />
  )
}

export default BaseCard
