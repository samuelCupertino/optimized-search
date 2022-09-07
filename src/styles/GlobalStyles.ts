import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  :root {
    --textPrimary: ${({ theme }) => theme.colors.textPrimary};
    --textSecondary: ${({ theme }) => theme.colors.textSecondary};
    --textTertiary: ${({ theme }) => theme.colors.textTertiary};
    --bgPrimary: ${({ theme }) => theme.colors.bgPrimary};
    --bgSecondary: ${({ theme }) => theme.colors.bgSecondary};
    --bgTertiary: ${({ theme }) => theme.colors.bgTertiary};
  }

  html,
  body {
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }

  body {
    background-color: ${({ theme }) => theme.colors.bgTertiary};
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

  ul {
    list-style: none;
  }


  .anim-loading {
    position: relative;
    pointer-events: none;
  }
  .anim-loading::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      45deg,
      ${({ theme }) => theme.colors.bgSecondary} 25%,
      ${({ theme }) => theme.colors.bgPrimary} 50%,
      ${({ theme }) => theme.colors.bgSecondary} 75%
    );
    background-size: 300%;
    pointer-events: none;
    border-radius: 6px;
    z-index: 1;
    animation: loadingEffect 3s infinite;
  }
  @keyframes loadingEffect {
    from {
      background-position: 300% 0;
    }
    to {
      background-position: 0% 0;
    }
  }
`
