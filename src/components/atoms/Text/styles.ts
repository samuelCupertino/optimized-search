import styled, { css } from 'styled-components'

export interface ITextComponent {
  type?: "title";
  margin?: string;
  padding?: string;
}

export const TextComponent = styled.p<ITextComponent>`
  font-size: ${({ theme }) => theme.sizes.small};
  margin: ${({ margin })=> margin};
  padding: ${({ padding })=> padding};
  color: ${({ theme }) => theme.colors.textSecondary};

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


