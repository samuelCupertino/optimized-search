import styled, { DefaultTheme } from 'styled-components'

export interface IHrComponent {
  color?: keyof DefaultTheme['colors']
  margin?: string
  padding?: string
}

export const HrComponent = styled.hr<IHrComponent>`
  background: ${({ theme, color = 'bgPrimary' }) => theme.colors[color]};
  border: none;
  padding: ${({ padding = '0.5px' }) => padding};
`
