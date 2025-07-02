import { Spin } from "antd"

export const PageSkeleton = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <Spin />
    </div>
  )
}
