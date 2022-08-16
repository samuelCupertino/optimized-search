import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    title: string

    sizes: {
      tiny: string
      small: string
      medium: string
      big: string
      giant: string
    },

    colors: {
      textPrimary: string
      textSecondary: string
      textTertiary: string
      bgPrimary: string
      bgSecondary: string
      bgTertiary: string
    }
  }
}