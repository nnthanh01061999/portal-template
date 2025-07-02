"use client"

import { Button } from "antd"
import { BellIcon } from "lucide-react"
import { FC } from "react"

interface NotificationPermissionButtonProps {
  className?: string
}

const NotificationPermissionButton: FC<NotificationPermissionButtonProps> = ({
  className
}) => {
  return (
    <Button type="text" icon={<BellIcon size={18} />} className={className} />
  )
}

export default NotificationPermissionButton
