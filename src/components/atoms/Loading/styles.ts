import styled, { keyframes, DefaultTheme } from 'styled-components'

export interface IContainerProps {
  size?: string
  color?: keyof DefaultTheme['colors']
  bgColor?: keyof DefaultTheme['colors']
  margin?: string
}

const animRotate = keyframes`
  to {
    rotate: 360deg;
  }
`

export const Container = styled.div<IContainerProps>`
  position: relative;
  width: ${({ size = '50px' }) => size};
  height: ${({ size = '50px' }) => size};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background: conic-gradient(
    ${({ theme, bgColor = 'bgTertiary' }) => theme.colors[bgColor]},
    ${({ theme, color = 'bgPrimary' }) => theme.colors[color]}
  );
  margin: ${({ margin }) => margin};
  animation: ${animRotate} 1s linear infinite;

  &::after {
    content: '';
    width: 75%;
    height: 75%;
    border-radius: 50%;
    background: ${({ theme, bgColor = 'bgTertiary' }) => theme.colors[bgColor]};
  }
`
