import styled from 'styled-components'

export interface IContainer {
  margin?: string;
  padding?: string;
}

export const Container = styled.div<IContainer>`
  width: 100%;
  display: flex;
  border-radius: 50px;
  overflow: hidden;
  border: 1px solid ${({ theme })=> theme.colors.bgPrimary};
  margin: ${({ margin })=> margin};
  padding: ${({ padding })=> padding};
`
