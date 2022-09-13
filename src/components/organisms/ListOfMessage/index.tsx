import Message, { IMessageProps } from '@/src/components/molecules/Message'
import { Container, IContainer, List, Item } from './styles'

export interface IMessage extends IMessageProps {
  id: number
}

export interface IListOfMessageProps extends IContainer {
  messages: IMessage[]
}

export const ListOfMessage: React.FC<IListOfMessageProps> = ({
  messages,
  ...props
}) => (
  <Container {...props}>
    <List>
      {messages.map((message) => (
        <Item key={message.id}>
          <Message {...message} />
        </Item>
      ))}
    </List>
  </Container>
)

export default ListOfMessage
