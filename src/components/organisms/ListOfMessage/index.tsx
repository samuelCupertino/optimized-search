import { useReducer } from 'react'
import { Message, IMessageProps } from '@/src/components/molecules/Message'
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

interface IMessageListAdd {
  type: 'ADD'
  direction?: 'start' | 'end'
  payload: IMessage
}
interface IMessageListRemove {
  type: 'REMOVE'
  payload: number
}

type IMessageListAction = IMessageListAdd | IMessageListRemove

export const useMessageListReducer = (initialState?: IMessage[]) => {
  const messageListReducer = (
    state: IMessage[],
    action: IMessageListAction
  ) => {
    switch (action.type) {
      case 'ADD': {
        return action.direction === 'end'
          ? [...state, action.payload]
          : [action.payload, ...state]
      }
      case 'REMOVE': {
        const newMessages = state.filter(
          (message) => message.id !== action.payload
        )
        return newMessages
      }
      default:
        return state
    }
  }

  const [messageListState, messageListDispatch] = useReducer(
    messageListReducer,
    initialState ?? []
  )

  return { messageListState, messageListDispatch }
}
