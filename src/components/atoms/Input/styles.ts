import styled, { DefaultTheme } from 'styled-components'

export interface IInputComponent {
  margin?: string
  padding?: string
  bgColor?: keyof DefaultTheme['colors']
}

export const InputComponent = styled.input<IInputComponent>`
  width: -webkit-fill-available;
  font-size: ${({ theme }) => theme.sizes.small};
  margin: ${({ margin }) => margin};
  padding: ${({ padding = '10px' }) => padding};
  color: ${({ theme }) => theme.colors.textSecondary};
  background: ${({ theme, bgColor = 'bgTertiary' }) => theme.colors[bgColor]};
  border-radius: 6px;
  border: none;
  outline: none;
`
