import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { useUsers, IStoreUserError } from '@/src/services/hooks'

import { Button, Loading, Text } from '@/src/components/atoms'
import { IUserCardProps } from '@/src/components/molecules'
import {
  useHttpMessageList,
  ListOfUserCard,
  UserFormModal,
} from '@/src/components/organisms'
import { Container, HeaderWrapper } from './styles'

export const OptimisticUIDependent: React.FC = () => {
  const queryClient = useQueryClient()
  const { fetchUsers, storeUser } = useUsers()
  const { HttpMessageList, addHttpMessage } = useHttpMessageList()
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

      const uniqueString = Date.now().toString(36).split('').reverse().join('')
      const optimisticUser: IUserCardProps = {
        ...userFormData,
        id: uniqueString.padEnd(10, uniqueString),
        loading: ['id'],
      }

      queryClient.setQueryData<IUserCardProps[]>(['users'], (oldUsers = []) => {
        return [optimisticUser, ...oldUsers]
      })

      return { optimisticUser }
    },
    onError: (error: IStoreUserError, userFormData, context) => {
      const optimisticUser = context?.optimisticUser as IUserCardProps

      queryClient.setQueryData<IUserCardProps[]>(['users'], (users = []) => {
        return users.filter((user) => user.id !== optimisticUser.id)
      })

      if (error.status === 422) {
        return addHttpMessage({
          status: 422,
          from: `do usuário ${userFormData.name}`,
        })
      }

      addHttpMessage({ from: `do usuário ${userFormData.name}` })
    },
    onSettled: () => {
      const [lastUser] =
        queryClient.getQueryData<IUserCardProps[]>(['users']) ?? []

      if (lastUser.loading) return

      queryClient.invalidateQueries(['users'])
    },
    retry: (failureCount, error: IStoreUserError) => {
      return error.isServerError ? failureCount < 3 : false
    },
  })

  return (
    <Container>
      <HttpMessageList />
      <HeaderWrapper>
        <Text type="primary" padding="10px">
          Lista de contatos:
        </Text>
        <Button
          type="secondary"
          onClick={() => {
            setUserFormModal({
              ...userFormModal,
              isVisible: true,
              values: {},
              errors: {},
            })
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
        onSave={storeMutation.mutate}
      />
    </Container>
  )
}
