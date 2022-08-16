import styled from 'styled-components'

export interface IContainer {
  width?: string;
  height?: string;
  margin?: string;
  padding?: string;
  border?: string;
  borderRadius?: string;
}

export const Container = styled.div<IContainer>`
  width: ${({ width })=> width};
  height: ${({ height })=> height};
  margin: ${({ margin })=> margin};
  padding: ${({ padding })=> padding};
  border: ${({ border })=> border};
  border-radius: ${({ borderRadius })=> borderRadius};
  overflow: hidden;
`