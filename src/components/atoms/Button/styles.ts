import styled, { css, DefaultTheme } from 'styled-components'

export interface IButtonComponent {
  type?: 'primary' | 'secondary'
  fontSize?: keyof DefaultTheme['sizes']
  color?: keyof DefaultTheme['colors']
  bgColor?: keyof DefaultTheme['colors']
  margin?: string
  padding?: string
}

export const ButtonComponent = styled.p<IButtonComponent>`
  font-size: ${({ theme, fontSize = 'small' }) => theme.sizes[fontSize]};
  font-weight: 500;
  color: ${({ theme, color = 'textTertiary' }) => theme.colors[color]};
  background: ${({ theme, bgColor = 'bgPrimary' }) =>
    bgColor && theme.colors[bgColor]};
  margin: ${({ margin }) => margin};
  padding: ${({ padding = '10px 20px' }) => padding};
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.5s, color 0.5s;

  ${({ type }) =>
    type === 'secondary' &&
    css<IButtonComponent>`
      color: ${({ theme }) => theme.colors.bgPrimary};
      background: transparent;
      border: 1px solid ${({ theme }) => theme.colors.bgPrimary};

      &:hover {
        color: ${({ theme }) => theme.colors.bgSecondary};
        background: ${({ theme }) => theme.colors.bgPrimary};
      }
    `}
`
