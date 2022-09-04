import { useEffect, useState } from 'react'
import { dark, light } from '@/src/styles/theme'

const DARK_OS_QUERY = '(prefers-color-scheme: dark)'

export const useTheme = () => {
  const [theme, setTheme] = useState(dark)

  useEffect(() => {
    if (typeof window === 'undefined') {
      setTheme(light)
      return
    }

    const isDark = window.matchMedia(DARK_OS_QUERY).matches
    setTheme(isDark ? dark : light)

    window
      .matchMedia(DARK_OS_QUERY)
      .addEventListener('change', (e) => setTheme(e.matches ? dark : light))
  }, [])

  return { theme }
}
