import { useEffect } from "react"

import { eventStoreBase } from "@/stores/stores/event"

function useEventListener<T = unknown>(
  event: string,
  handler: (data: T) => void
) {
  useEffect(() => {
    const unsubscribe = eventStoreBase.getState().subscribeTo(event, handler)
    return () => unsubscribe()
  }, [event, handler])
}

export default useEventListener
