import { useState } from "react"

export type TUpdateState<T> = {
  open: boolean
  id?: string | number
  dataOpen?: T
}

const defaultState = {
  open: false,
  id: undefined,
  dataOpen: undefined
}

const useOpen = <T>() => {
  const [state, setState] = useState<TUpdateState<T>>(defaultState)

  const onOpen = (props?: Omit<TUpdateState<T>, "open">) => {
    setState((prev) => ({ ...prev, ...props, open: true }))
  }

  const onClose = () => {
    setState(defaultState)
  }

  return {
    ...state,
    onOpen,
    onClose
  }
}

export default useOpen
