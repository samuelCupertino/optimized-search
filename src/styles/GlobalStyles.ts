import theme from './theme'
import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
:root {
  --fontSizeTiny: 12px;
  --fontSizeSmall: 14px;
  --fontSizeMedium: 16px;
  --fontSizeBig: 18px;
  --fontSizeGiant: 24px;

  --textColorPrimary: #eef0f6;
  --textColorSecondary: #d3d2e8;
  --textColorTertiary: #000000;

  --bgColorPrimary: #6e77fc;
  --bgColorSecondary: #1d1f33;
  --bgColorTertiary: #0c0e16;
}

:root.dark {
  --textColorPrimary: #485783;
  --textColorSecondary: #52516e;
  --textColorTertiary: #ffffff;

  --bgColorPrimary: #6e77fc;
  --bgColorSecondary: #f8f9ff;
  --bgColorTertiary: #f0f1fe;
}

html,
body {
  padding: 0;
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
}

a {
  color: inherit;
  text-decoration: none;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
    background-color: ${theme.colors.bgTertiary};
}

/* @media (prefers-color-scheme: dark) {
  html {
    color-scheme: dark;
  }
  body {
    color: white;
    background: black;
  }
} */

`