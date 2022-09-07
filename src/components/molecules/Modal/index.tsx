import { Text } from '@/src/components/atoms'
import {
  Container,
  HeaderWrapper,
  BodyWrapper,
  FooterWrapper,
  IContainer,
  ModalContent,
} from './styles'

interface IModalProps extends IContainer {
  title?: string
  body: React.ReactNode
  footer?: React.ReactNode
  onClickOutside?: () => void
}

const Modal: React.FC<IModalProps> = ({
  title,
  body,
  footer,
  onClickOutside,
  ...props
}) => (
  <Container {...props} onClick={onClickOutside}>
    <ModalContent onClick={(e) => e.stopPropagation()}>
      {title && (
        <HeaderWrapper>
          <Text color="textTertiary" fontSize="medium">
            {title}
          </Text>
        </HeaderWrapper>
      )}
      <BodyWrapper> {body} </BodyWrapper>
      {footer && <FooterWrapper> {footer} </FooterWrapper>}
    </ModalContent>
  </Container>
)

export default Modal
