import styled, { keyframes } from 'styled-components'

export interface IContainerProps {
  margin?: string
}

const animRotate = keyframes`
  to {
    transform: rotate(360deg);
  }
`

export const Container = styled.div<IContainerProps>`
  position: relative;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background: conic-gradient(
    ${({ theme }) => theme.colors.bgTertiary},
    ${({ theme }) => theme.colors.bgPrimary}
  );
  margin: ${({ margin }) => margin};
  animation: ${animRotate} 1s linear infinite;

  &::after {
    content: '';
    width: 75%;
    height: 75%;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.bgTertiary};
  }
`
