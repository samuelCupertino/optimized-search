import styled, { css, DefaultTheme } from 'styled-components'

export interface IButtonComponent {
  type?: 'secondary'
  fontSize?: keyof DefaultTheme['sizes']
  color?: keyof DefaultTheme['colors']
  bgColor?: keyof DefaultTheme['colors']
  margin?: string
  padding?: string
}

export const ButtonComponent = styled.p<IButtonComponent>`
  font-size: ${({ theme, fontSize = 'small' }) => theme.sizes[fontSize]};
  color: ${({ theme, color = 'textPrimary' }) => theme.colors[color]};
  background: ${({ theme, bgColor = 'bgPrimary' }) =>
    bgColor && theme.colors[bgColor]};
  margin: ${({ margin }) => margin};
  padding: ${({ padding = '10px 20px' }) => padding};
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.5s;

  ${({ type }) =>
    type === 'secondary' &&
    css<IButtonComponent>`
      background: transparent;
      border: 1px solid ${({ theme }) => theme.colors.bgPrimary};

      &:hover {
        background: ${({ theme }) => theme.colors.bgPrimary};
      }
    `}
`
