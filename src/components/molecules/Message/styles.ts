import styled from 'styled-components'

export interface IContainer {
  isVisible?: boolean
  colorPrimary?: 'info' | 'success' | 'warning' | 'danger'
  margin?: string
  padding?: string
  cursor?: 'default' | 'pointer'
}

export const Container = styled.article<IContainer>`
  visibility: ${({ isVisible = true }) => (isVisible ? 'visible' : 'hidden')};
  position: relative;
  width: 100%;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid
    ${({ theme, colorPrimary = 'info' }) => theme.colors[colorPrimary]};
  background: linear-gradient(
    45deg,
    ${({ theme, colorPrimary = 'info' }) => theme.colors[colorPrimary]} -2000%,
    transparent 500%
  );
  margin: ${({ margin }) => margin};
  padding: ${({ padding }) => padding};
  cursor: ${({ cursor }) => cursor};
`

export const ButtonClose = styled.button<Pick<IContainer, 'colorPrimary'>>`
  position: absolute;
  top: 3px;
  right: 5px;
  font-size: 16px;
  padding: 5px 6px;
  color: ${({ theme, colorPrimary = 'info' }) => theme.colors[colorPrimary]};
  background: transparent;
  border: none;
  cursor: pointer;
`
