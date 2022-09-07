import styled from 'styled-components'

export interface IContainer {
  height?: string
  margin?: string
  padding?: string
}

export const Container = styled.div<IContainer>`
  height: ${({ height }) => height};
  margin: ${({ margin }) => margin};
  padding: ${({ padding }) => padding};
  border-radius: 8px;

  overflow: auto;
`

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

export const Item = styled.li``
