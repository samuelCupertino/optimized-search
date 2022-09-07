import styled, { css, DefaultTheme } from 'styled-components'

export interface IContainer {
  color?: keyof DefaultTheme['colors']
  margin?: string
  padding?: string
}

export interface ITooltipWrapper {
  width?: string
  direction?: 'top' | 'right' | 'bottom' | 'left'
}

export const Container = styled.div<IContainer>`
  position: relative;
  padding: ${({ padding }) => padding};
  margin: ${({ margin }) => margin};
`

export const TargetWrapper = styled.div`
  cursor: pointer;
  transition: filter 0.5s;

  &:hover {
    filter: brightness(0.75);
  }
`

export const TooltipWrapper = styled.div<ITooltipWrapper>`
  position: absolute;
  width: ${({ width = 'min(200px, 40vw)' }) => width};
  border-radius: 6px;
  display: none;
  border: 1px solid ${({ theme }) => theme.colors.bgPrimary};
  background: ${({ theme }) => theme.colors.bgTertiary};
  z-index: 1;

  &.active {
    display: block;
  }

  &::before {
    content: '';
    width: 10px;
    height: 10px;
    position: absolute;
    top: 50%;
    left: 0;
    rotate: 45deg;
    translate: -6px -50%;
    background: ${({ theme }) => theme.colors.bgTertiary};
    border: 1px solid ${({ theme }) => theme.colors.bgPrimary};
    border-right: none;
    border-top: none;
    z-index: 0;
  }

  ${({ direction = 'top' }) => {
    switch (direction) {
      case 'top':
        return css`
          top: 0;
          left: 50%;
          translate: -50% calc(-100% - 15px);
        `
      case 'right':
        return css`
          top: 50%;
          left: 100%;
          translate: 15px -50%;
        `
      case 'bottom':
        return css`
          bottom: 0;
          left: 50%;
          translate: -50% calc(100% + 15px);
        `
      case 'left':
        return css`
          top: 50%;
          right: 100%;
          translate: 15px -50%;
        `
    }
  }}
`
