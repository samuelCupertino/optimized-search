import { DefaultTheme } from 'styled-components'

const light: DefaultTheme = {
  title: 'light',

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
    textPrimary: '#485783',
    textSecondary: '#52516e',
    textTertiary: '#9997ba',
    textQuaternary: '#ffffff',
    bgPrimary: '#6e77fc',
    bgSecondary: '#f8f9ff',
    bgTertiary: '#f0f1fe',
    danger: '#ff4444',
    warning: '#ffbb33',
    success: '#00C851',
    info: '#33b5e5',
  },
}

export default light
