import styled from 'styled-components'

export interface IContainer {
  margin?: string;
  padding?: string;
}

export const Container = styled.article<IContainer>`
  width: 100%;
  display: flex;
  gap: 10px;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.bgPrimary};
  background: ${({ theme }) => theme.colors.bgSecondary};
  margin: ${({ margin })=> margin};
  padding: ${({ padding })=> padding};
`

export const AvatarWrapper = styled.div`
  position: relative;
  padding: 10px;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: ${({ theme }) => theme.colors.bgPrimary};
    clip-path: polygon(0 0, 25% 0, 100% 100%, 0 100%);
  }
`

export const TextWrapper = styled.div`
  width: 100%;
  padding: 10px 0;
`

