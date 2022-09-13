import { Hr, Text } from '@/src/components/atoms'
import { Container, IContainer, ButtonClose } from './styles'

export interface IMessageProps extends IContainer {
  type?: 'info' | 'success' | 'warning' | 'danger'
  title: string
  text: string
  onClick?: () => void
  onClose?: () => void
}

const Message: React.FC<IMessageProps> = ({
  type = 'info',
  title,
  text,
  onClick,
  onClose,
  ...props
}) => {
  const handlerClose = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    onClose?.()
  }

  return (
    <Container
      {...props}
      colorPrimary={type}
      cursor={onClick && 'pointer'}
      onClick={onClick}
    >
      {onClose && (
        <ButtonClose colorPrimary={type} onClick={handlerClose}>
          x
        </ButtonClose>
      )}
      <Text as="h2" fontSize="medium" margin="0 0 8px 0">
        {title}
      </Text>
      <Hr color={type} margin="0 0 10px 0" />
      <Text as="p" lineHeight="160%">
        {text}
      </Text>
    </Container>
  )
}

export default Message
