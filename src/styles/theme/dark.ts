import { DefaultTheme } from 'styled-components'

const dark: DefaultTheme = {
  title: 'dark',

  sizes: {
    tiny: '12px',
    small: '14px',
    medium: '16px',
    big: '18px',
    giant: '24px',
  },

  breakpoints: {
    xs: '340px',
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
  },

  colors: {
    textPrimary: '#eef0f6',
    textSecondary: '#d3d2e8',
    textTertiary: '#000000',
    bgPrimary: '#6e77fc',
    bgSecondary: '#1d1f33',
    bgTertiary: '#0c0e16',
  },
}

export default dark
