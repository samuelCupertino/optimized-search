import styled, { css, DefaultTheme } from 'styled-components'

export interface ITextComponent {
  type?: 'primary'
  wordBreak?: 'break-all' | 'break-word'
  fontSize?: keyof DefaultTheme['sizes']
  lineHeight?: string
  color?: keyof DefaultTheme['colors']
  bgColor?: keyof DefaultTheme['colors']
  margin?: string
  padding?: string
}

export const TextComponent = styled.span<ITextComponent>`
  word-break: ${({ wordBreak }) => wordBreak};
  font-size: ${({ theme, fontSize = 'small' }) => theme.sizes[fontSize]};
  line-height: ${({ lineHeight }) => lineHeight};
  color: ${({ theme, color = 'textSecondary' }) => theme.colors[color]};
  background: ${({ theme, bgColor }) => bgColor && theme.colors[bgColor]};
  margin: ${({ margin }) => margin};
  padding: ${({ padding }) => padding};

  ${({ type }) =>
    type === 'primary' &&
    css<ITextComponent>`
      font-size: ${({ theme, fontSize = 'medium' }) => theme.sizes[fontSize]};
      border-bottom: 1px solid ${({ theme }) => theme.colors.bgPrimary};
      color: ${({ theme }) => theme.colors.textPrimary};
    `}
`

export const TextHighlight = styled.span`
  background: ${({ theme }) => theme.colors.bgPrimary};
  border-radius: 3px;
`
