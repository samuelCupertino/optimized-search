import styled from 'styled-components'

export interface IContainer {
  fontSize?: string;
  margin?: string;
  padding?: string;
}

export const Container = styled.div<IContainer>`
  font-size: ${({ fontSize="12px" }) => fontSize};
  margin: ${({ margin })=> margin};
  padding: ${({ padding })=> padding};
`