import styled from 'styled-components'

export interface IContainer {
  colorPrimary?: 'bgPrimary' | 'danger' | 'warning' | 'info' | 'success'
  margin?: string
  padding?: string
}

export const Container = styled.article<IContainer>`
  width: 100%;
  display: flex;
  gap: 10px;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid
    ${({ theme, colorPrimary = 'bgPrimary' }) => theme.colors[colorPrimary]};
  background: ${({ theme }) => theme.colors.bgSecondary};
  margin: ${({ margin }) => margin};
  padding: ${({ padding }) => padding};

  @media (max-width: ${({ theme }) => theme.breakpoints.xs}) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`

export const AvatarWrapper = styled.div<Pick<IContainer, 'colorPrimary'>>`
  position: relative;
  padding: 10px;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: ${({ theme, colorPrimary = 'bgPrimary' }) =>
      theme.colors[colorPrimary]};
    clip-path: polygon(0 0, 25% 0, 100% 100%, 0 100%);
  }
`

export const CurvatureDetail = styled.div<Pick<IContainer, 'colorPrimary'>>`
  --size: 13px;
  width: var(--size);
  height: var(--size);
  position: absolute;
  top: -0.25%;
  left: 30%;
  border-radius: 45%;
  rotate: -35deg;
  background: ${({ theme }) => theme.colors.bgSecondary};
  z-index: 1;
  box-shadow: -6px 3px 0 -2px ${({ theme, colorPrimary = 'bgPrimary' }) => theme.colors[colorPrimary]},
    3.5px 107.2px 0 0px ${({ theme }) => theme.colors.bgSecondary},
    -2px 104px 0 -2px
      ${({ theme, colorPrimary = 'bgPrimary' }) => theme.colors[colorPrimary]};
`

export const TextWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 10px 0;
`
