import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  :root {
    --textPrimary: ${({ theme }) => theme.colors.textPrimary};
    --textSecondary: ${({ theme }) => theme.colors.textSecondary};
    --textTertiary: ${({ theme }) => theme.colors.textTertiary};
    --textQuaternary: ${({ theme }) => theme.colors.textQuaternary};
    --bgPrimary: ${({ theme }) => theme.colors.bgPrimary};
    --bgSecondary: ${({ theme }) => theme.colors.bgSecondary};
    --bgTertiary: ${({ theme }) => theme.colors.bgTertiary};
    --danger: ${({ theme }) => theme.colors.danger}
    --warning: ${({ theme }) => theme.colors.warning}
    --success: ${({ theme }) => theme.colors.success}
    --info: ${({ theme }) => theme.colors.info}
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
      ${({ theme }) => theme.colors.textQuaternary} 25%,
      ${({ theme }) => theme.colors.bgPrimary} 50%,
      ${({ theme }) => theme.colors.textQuaternary} 75%
    );
    background-size: 300%;
    border-radius: 4px;
    pointer-events: none;
    z-index: 1;
    animation: animLoading 3s infinite;
  }
  @keyframes animLoading {
    from {
      background-position: 300% 0;
    }
    to {
      background-position: 0 0;
    }
  }
`
