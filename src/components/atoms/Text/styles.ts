import styled from 'styled-components'

export interface ITextComponent {
  fontSize?: string;
  margin?: string;
  padding?: string;
}

export const TextComponent = styled.p<ITextComponent>`
  font-size: ${({ fontSize="12px" }) => fontSize};
  margin: ${({ margin })=> margin};
  padding: ${({ padding })=> padding};
`