import styled from 'styled-components'

export interface IInputComponent {
  margin?: string
  padding?: string
  bgColor?: string
}

export const InputComponent = styled.input<IInputComponent>`
  width: 100%;
  font-size: ${({ theme }) => theme.sizes.small};
  margin: ${({ margin })=> margin};
  padding: ${({ padding="0 10px" })=> padding};
  color: ${({ theme }) => theme.colors.textSecondary};
  background: ${({ bgColor }) => bgColor};
  outline: none;
  border: none;
`


