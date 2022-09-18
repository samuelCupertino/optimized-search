import styled, { keyframes } from 'styled-components'

export interface IContainer {
  isVisible: boolean
  margin?: string
  padding?: string
}

const animShowModal = keyframes`
  0% {
    opacity: 0;
    visibility: visible;
  }
  100% {
    opacity: 1;
    visibility: visible;
  }
`
const animHideModal = keyframes`
  0% {
    opacity: 1;
    visibility: visible;
  }
  99% {
    opacity: 0;
    visibility: visible;
  }
  100% {
    opacity: 0;
    visibility: hidden;
  }
`

export const Container = styled.div<IContainer>`
  visibility: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  inset: 0;
  backdrop-filter: brightness(0.5) blur(1px);
  z-index: 1000;
  animation: ${({ isVisible }) => (isVisible ? animShowModal : animHideModal)}
    0.5s ease-in-out forwards;
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
