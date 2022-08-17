import styled, { css } from 'styled-components'

export interface ITextComponent {
  type?: "title"
  margin?: string
  padding?: string
  color?: string
  bgColor?: string
  fontSize?: string
  wordBreak?: 'break-all' | 'break-word'
}

export const TextComponent = styled.p<ITextComponent>`
  font-size: ${({ theme, fontSize }) => fontSize || theme.sizes.small };
  margin: ${({ margin })=> margin};
  padding: ${({ padding })=> padding};
  color: ${({ theme, color }) => color || theme.colors.textSecondary};
  background: ${({ bgColor }) => bgColor};
  word-break: ${({ wordBreak }) => wordBreak};

  ${({ type })=> type === 'title' && css`
    font-size: ${({ theme }) => theme.sizes.medium};
    border-bottom: 1px solid ${({ theme }) => theme.colors.bgPrimary};
    color: ${({ theme }) => theme.colors.textPrimary};
  `}
`

export const TextHighlight = styled.span`
  background: ${({ theme }) => theme.colors.bgPrimary};
  border-radius: 2px;
`


