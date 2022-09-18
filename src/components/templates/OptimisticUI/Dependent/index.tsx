import { useQuery, useMutation, useQueryClient } from 'react-query'
import { useUsers, IStoreUserError } from '@/src/services/hooks'

import { Button, Loading, Text } from '@/src/components/atoms'
import { IUserCardProps } from '@/src/components/molecules'
import {
  useHttpMessageList,
  useUserFormModal,
  ListOfUserCard,
} from '@/src/components/organisms'
import { Container, HeaderWrapper } from './styles'

export const OptimisticUIDependent: React.FC = () => {
  const queryClient = useQueryClient()
  const HttpMessageList = useHttpMessageList()
  const UserFormModal = useUserFormModal()
  const { fetchUsers, storeUser } = useUsers()

  const { data, isSuccess, isLoading, isError } = useQuery(
    ['users'],
    () => fetchUsers(),
    { refetchOnWindowFocus: false }
  )

  const storeMutation = useMutation(storeUser, {
    onMutate: async (userFormData) => {
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

      const newMessage = {
        from: `do usuário '${userFormData.name}'`,
        onClick: () => {
          UserFormModal.set({ values: userFormData, errors: error.data })
        },
      }

      if (error.status === 422) {
        return HttpMessageList.add({ ...newMessage, status: 422 })
      }

      HttpMessageList.add(newMessage)
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
      <HttpMessageList.component />

      <HeaderWrapper>
        <Text type="primary" padding="10px">
          Lista de contatos:
        </Text>
        <Button
          type="secondary"
          onClick={() => UserFormModal.setIsVisible(true)}
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

      <UserFormModal.component onSave={storeMutation.mutate} />
    </Container>
  )
}
