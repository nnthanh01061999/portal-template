import { ModalProps } from "antd"

export const withModal = <T,>(Component: React.ComponentType<T>) => {
  const displayName = Component.displayName || Component.name || "Component"

  const WithModal = (props: T & { open: ModalProps["open"] }) => {
    const { open } = props

    return open ? <Component {...props} /> : null
  }

  WithModal.displayName = displayName

  return WithModal
}
