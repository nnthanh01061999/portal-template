import { useEffect, useState } from "react"

export function useDebounceValue<T>(value: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value)
  const [isDebouncing, setIsDebouncing] = useState(false)

  useEffect(() => {
    setIsDebouncing(true)
    const handler = setTimeout(() => {
      setDebouncedValue(value)
      setIsDebouncing(false)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return { debouncedValue, isDebouncing }
}
