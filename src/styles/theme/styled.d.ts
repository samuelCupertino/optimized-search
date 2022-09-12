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
    }

    breakpoints: {
      xs: string
      sm: string
      md: string
      lg: string
      xl: string
    }

    colors: {
      textPrimary: string
      textSecondary: string
      textTertiary: string
      textQuaternary: string
      bgPrimary: string
      bgSecondary: string
      bgTertiary: string
      danger: string
      warning: string
      success: string
      info: string
    }
  }
}
