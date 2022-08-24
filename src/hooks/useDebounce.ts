import { useState, useEffect } from 'react'

interface IUseDebounceData<T> {
  value: T
  isWaiting: boolean
}

export const useDebounce = <T>(value: T, delay = 500): IUseDebounceData<T> => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timeoutId = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(timeoutId)
  }, [value, delay])

  return { value: debouncedValue, isWaiting: debouncedValue !== value }
}
