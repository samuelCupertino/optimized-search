import styled from 'styled-components'

export interface IContainer {
  margin?: string
  padding?: string
}

export const Container = styled.div<IContainer>`
  margin: ${({ margin }) => margin};
  padding: ${({ padding }) => padding};
`

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const Item = styled.li``
