import styled, { keyframes } from 'styled-components'

export interface IContainer {
  isVisible: boolean
  margin?: string
  padding?: string
}

const animShowModal = keyframes`
  from {
    opacity: 0
  }
  to {
    opacity: 1
  }
`
const animHideModal = keyframes`
  from {
    opacity: 1
  }
  to {
    opacity: 0
  }
`

export const Container = styled.div<IContainer>`
  display: flex;
  visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};
  justify-content: center;
  align-items: center;
  position: absolute;
  inset: 0;
  backdrop-filter: brightness(0.5) blur(1px);
  z-index: 1000;
  transition: visibility 0.5s ease-in-out;
  animation: ${({ isVisible }) => (isVisible ? animShowModal : animHideModal)}
    0.5s ease-in-out;
`

export const ModalContent = styled.div`
  width: min(600px, 90vw);
  min-height: 200px;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.bgPrimary};
  overflow: hidden;
`

export const HeaderWrapper = styled.div`
  position: relative;
  display: flex;
  gap: 15px;
  padding: 15px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.bgPrimary};
  background: linear-gradient(
    45deg,
    ${({ theme }) => theme.colors.bgPrimary} 200px,
    ${({ theme }) => theme.colors.bgSecondary} 0
  );
`

export const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  padding: 20px;
  background: ${({ theme }) => theme.colors.bgTertiary};
`

export const FooterWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  padding: 10px;
  border-top: 1px solid ${({ theme }) => theme.colors.bgPrimary};
  background: ${({ theme }) => theme.colors.bgSecondary};
`
