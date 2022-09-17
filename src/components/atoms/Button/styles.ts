import styled, { css, DefaultTheme } from 'styled-components'

export interface IContainer {
  type?: 'primary' | 'secondary'
  fontSize?: keyof DefaultTheme['sizes']
  color?: keyof DefaultTheme['colors']
  bgColor?: keyof DefaultTheme['colors']
  cursor?: 'default' | 'pointer' | 'copy' | 'not-allowed' | 'wait'
  margin?: string
  padding?: string
}

export const Container = styled.div<IContainer>`
  cursor: ${({ cursor = 'pointer' }) => cursor};
  margin: ${({ margin }) => margin};
  padding: ${({ padding }) => padding};
  color: ${({ theme, color = 'textQuaternary' }) => theme.colors[color]};

  ${({ type }) =>
    type === 'secondary' &&
    css<IContainer>`
      > button {
        color: ${({ theme }) => theme.colors.bgPrimary};
        background: transparent;
        border: 1px solid ${({ theme }) => theme.colors.bgPrimary};

        &:hover {
          color: ${({ theme }) => theme.colors.bgSecondary};
          background: ${({ theme }) => theme.colors.bgPrimary};
        }
      }
    `}
`

export const ButtonComponent = styled.button<IContainer>`
  font-size: ${({ theme, fontSize = 'small' }) => theme.sizes[fontSize]};
  font-weight: 500;
  padding: 10px 20px;
  border-radius: 4px;
  border: none;
  background: ${({ theme, bgColor = 'bgPrimary' }) =>
    bgColor && theme.colors[bgColor]};
  cursor: ${({ cursor = 'pointer' }) => cursor};
  pointer-events: ${({ cursor }) => cursor === 'wait' && 'none'};

  transition: background 0.5s, color 0.5s;
`
