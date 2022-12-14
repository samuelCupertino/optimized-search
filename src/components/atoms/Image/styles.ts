import styled, { DefaultTheme } from 'styled-components'

export interface IContainer {
  width?: string
  height?: string
  border?: string
  borderRadius?: string
  margin?: string
  padding?: string
  color?: keyof DefaultTheme['colors']
  bgColor?: keyof DefaultTheme['colors']
}

export const Container = styled.div<IContainer>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  border: ${({ border }) => border};
  color: ${({ theme, color = 'bgPrimary' }) => theme.colors[color]};
  background: ${({ theme, bgColor }) => bgColor && theme.colors[bgColor]};
  border-radius: ${({ borderRadius }) => borderRadius};
  margin: ${({ margin }) => margin};
  padding: ${({ padding }) => padding};
  overflow: hidden;
`
