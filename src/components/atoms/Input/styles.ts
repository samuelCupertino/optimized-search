import styled, { DefaultTheme } from 'styled-components'

export interface IInputComponent {
  margin?: string
  padding?: string
  bgColor?: keyof DefaultTheme['colors']
}

export const InputComponent = styled.input<IInputComponent>`
  width: 100%;
  font-size: ${({ theme }) => theme.sizes.small};
  margin: ${({ margin })=> margin};
  padding: ${({ padding='0 10px' })=> padding};
  color: ${({ theme }) => theme.colors.textSecondary};
  background: ${({ theme, bgColor }) => bgColor && theme.colors[bgColor]};
  outline: none;
  border: none;
`
