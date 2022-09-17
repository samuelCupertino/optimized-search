import { useState } from 'react'
import { Message, IMessageProps } from '@/src/components/molecules/Message'
import { Container, IContainer, List, Item } from './styles'

export interface IHttpMessage extends IMessageProps {
  id: number
}

export interface IHttpMessageListProps extends IContainer {
  messages: IHttpMessage[]
}

export const HttpMessageList: React.FC<IHttpMessageListProps> = ({
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

interface IHttpMessageStandard {
  422: Omit<IHttpMessage, 'id'>
  default: Omit<IHttpMessage, 'id'>
}

interface IAddHttpMessage {
  status?: keyof IHttpMessageStandard
  direction?: 'start' | 'end'
  from?: string
  onClick?: () => void
  onChange?: () => void
}

const messagesHttpStandard: IHttpMessageStandard = {
  422: {
    type: 'warning',
    title: 'Informações invalidas!',
    text: 'As informações {from} estão invalidas. Clique aqui para editar.',
  },
  default: {
    type: 'danger',
    title: 'Oops... Erro inesperado!',
    text: 'Ocorreu um erro ao salvar as informações {from}. Clique aqui para tentar novamente.',
  },
}

export const useHttpMessageList = (initialState: IHttpMessage[] = []) => {
  const [httpMessageList, setHttpMessageList] = useState(initialState)

  const addHttpMessage = (options: IAddHttpMessage) => {
    setHttpMessageList((messages) => {
      const newMessageId = messages.length + 1
      const newMessageProps = messagesHttpStandard[options.status ?? 'default']

      const newMessage = {
        ...newMessageProps,
        id: newMessageId,
        text: newMessageProps.text.replace('{from}', options.from ?? ''),
        onClick: () => {
          removeHttpMessage(newMessageId)
          options.onClick?.()
        },
        onClose: () => {
          removeHttpMessage(newMessageId)
          options.onChange?.()
        },
      }

      return options.direction === 'start'
        ? [newMessage, ...messages]
        : [...messages, newMessage]
    })
  }

  const removeHttpMessage = (messageId: number) => {
    setHttpMessageList((messages) => {
      return messages.filter((message) => message.id !== messageId)
    })
  }

  const component = () => {
    if (!httpMessageList.length) return null
    return <HttpMessageList messages={httpMessageList} />
  }

  return {
    addHttpMessage,
    removeHttpMessage,
    HttpMessageList: component,
  }
}
