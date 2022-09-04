import { QueryClient, QueryClientProvider } from 'react-query'
import type { AppProps } from 'next/app'

import { GlobalStyles } from '@/src/styles/GlobalStyles'
import { ThemeProvider } from 'styled-components'
import { useTheme } from '@/src/hooks/useTheme'

const queryClient = new QueryClient()

const MyApp = ({ Component, pageProps }: AppProps) => {
  const { theme } = useTheme()

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Component {...pageProps} />
      </ThemeProvider>
    </QueryClientProvider>
  )
}
export default MyApp
