import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { useUsers, IStoreUserError } from '@/src/services/hooks'

import { Button, Loading, Text } from '@/src/components/atoms'
import { IUserCardProps } from '@/src/components/molecules'
import {
  ListOfMessage,
  IMessage,
  useMessageListReducer,
  ListOfUserCard,
  UserFormModal,
} from '@/src/components/organisms'
import { Container, HeaderWrapper } from './styles'

export const OptimisticUIDependent: React.FC = () => {
  const queryClient = useQueryClient()
  const { fetchUsers, storeUser } = useUsers()
  const { messageListState, messageListDispatch } = useMessageListReducer()
  const [userFormModal, setUserFormModal] = useState({
    isVisible: false,
    values: {},
    errors: {},
  })

  const { data, isSuccess, isLoading, isError } = useQuery(
    ['users'],
    () => fetchUsers(),
    { refetchOnWindowFocus: false }
  )

  const storeMutation = useMutation(storeUser, {
    onMutate: async (userFormData) => {
      setUserFormModal({ ...userFormModal, isVisible: false })
      await queryClient.cancelQueries(['users'])
      const oldUsers =
        queryClient.getQueryData<IUserCardProps[]>(['users']) ?? []

      const uniqueString = new Date().getTime().toString(36)
      const optimisticUser: IUserCardProps = {
        ...userFormData,
        id: uniqueString.padEnd(10, uniqueString),
        loading: ['id'],
      }

      queryClient.setQueryData(['users'], [optimisticUser, ...oldUsers])

      return oldUsers
    },
    onError: (error: IStoreUserError, userFormData, oldUsers) => {
      queryClient.setQueryData(['users'], oldUsers)

      const errorMessageId = messageListState.length
      const errorMessageStandard: IMessage = {
        id: errorMessageId,
        type: 'danger',
        title: 'Oops... Erro inesperado!',
        text: `Ocorreu um erro ao salvar o usuário '${userFormData.name}'. Clique aqui para tentar novamente.`,
        onClick: () => {
          messageListDispatch({ type: 'REMOVE', payload: errorMessageId })
          setUserFormModal({
            ...userFormModal,
            isVisible: true,
            values: userFormData,
            errors: error.data,
          })
        },
        onClose: () => {
          messageListDispatch({ type: 'REMOVE', payload: errorMessageId })
        },
      }

      if (error.status === 422) {
        return messageListDispatch({
          type: 'ADD',
          payload: {
            ...errorMessageStandard,
            type: 'warning',
            title: 'Informações invalidas!',
            text: `As informações do usuário '${userFormData.name}' estão invalidas. Clique aqui para editar.`,
          },
        })
      }

      messageListDispatch({ type: 'ADD', payload: errorMessageStandard })
    },
    onSettled: () => {
      queryClient.invalidateQueries(['users'])
    },
    retry: (failureCount, error: IStoreUserError) => {
      return error.isServerError ? failureCount < 3 : false
    },
  })

  return (
    <Container>
      {!!messageListState.length && (
        <ListOfMessage messages={messageListState} />
      )}
      <HeaderWrapper>
        <Text type="primary" padding="10px">
          Lista de contatos:
        </Text>
        <Button
          type="secondary"
          onClick={() => {
            setUserFormModal({ ...userFormModal, isVisible: true })
          }}
        >
          + Adicionar Contato
        </Button>
      </HeaderWrapper>

      {isLoading && <Loading margin="40px auto" />}
      {isSuccess && data.length && <ListOfUserCard users={data} />}
      {isSuccess && data.length === 0 && (
        <Text type="primary" padding="10px">
          Nenhum usuário cadastrado.
        </Text>
      )}
      {isError && (
        <Text type="primary" padding="10px">
          Erro ao buscar usuários! Tente novamente mais tarde.
        </Text>
      )}

      <UserFormModal
        isVisible={userFormModal.isVisible}
        values={userFormModal.values}
        errors={userFormModal.errors}
        onHide={() => setUserFormModal({ ...userFormModal, isVisible: false })}
        onSave={(userFormData) => storeMutation.mutate(userFormData)}
      />
    </Container>
  )
}
