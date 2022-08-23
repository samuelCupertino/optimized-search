import styled from 'styled-components'

export interface IContainer {
  width?: string
  height?: string
  border?: string
  borderRadius?: string
  margin?: string
  padding?: string
}

export const Container = styled.div<IContainer>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  border: ${({ border }) => border};
  color: ${({ theme }) => theme.colors.bgPrimary};
  border-radius: ${({ borderRadius }) => borderRadius};
  margin: ${({ margin }) => margin};
  padding: ${({ padding }) => padding};
  overflow: hidden;
`
