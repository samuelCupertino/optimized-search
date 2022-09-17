import styled, { DefaultTheme } from 'styled-components'

export interface IContainer {
  listStyle?: 'disc' | 'circle' | 'square'
  fontSize?: keyof DefaultTheme['sizes']
  lineHeight?: string
  color?: keyof DefaultTheme['colors']
  margin?: string
  padding?: string
}

export const Container = styled.ul<IContainer>`
  list-style: ${({ listStyle = 'disc' }) => listStyle};
  font-size: ${({ theme, fontSize = 'small' }) => theme.sizes[fontSize]};
  line-height: ${({ lineHeight = '140%' }) => lineHeight};
  color: ${({ theme, color = 'textPrimary' }) => theme.colors[color]};
  padding: ${({ padding = '0 0 0 15px' }) => padding};
  margin: ${({ margin }) => margin};
`

export const Item = styled.li``
