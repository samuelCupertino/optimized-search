import { useQuery, useMutation, useQueryClient } from 'react-query'
import { useUsers, IStoreUserError } from '@/src/services/hooks'

import { Button, Loading, Text } from '@/src/components/atoms'
import { IUserCardProps } from '@/src/components/molecules'
import { ListOfUserCard, useUserFormModal } from '@/src/components/organisms'
import { Container, HeaderWrapper } from './styles'

export const OptimisticUIUseCase: React.FC = () => {
  const queryClient = useQueryClient()
  const UserFormModal = useUserFormModal()
  const { storeUser, fetchUsers } = useUsers()

  const { data, isSuccess, isFetching, isError } = useQuery(
    ['users'],
    () => fetchUsers(),
    { refetchOnWindowFocus: false }
  )

  const storeMutation = useMutation(storeUser, {
    onMutate: async () => {
      await queryClient.cancelQueries(['users'])
      const oldUsers = queryClient.getQueryData<IUserCardProps[]>(['users'])

      return oldUsers
    },
    onSuccess: () => {
      UserFormModal.setIsVisible(false)
      UserFormModal.setErrors(null)
      queryClient.invalidateQueries(['users'])
    },
    onError: (error: IStoreUserError, _userCardForm, oldUsers) => {
      if (error.status === 422) {
        UserFormModal.setErrors(error.data)
      }

      queryClient.setQueryData(['users'], oldUsers)
    },
    retry: (failureCount, error: IStoreUserError) => {
      return error.isServerError ? failureCount < 3 : false
    },
  })

  return (
    <Container>
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

      {isFetching && <Loading margin="40px auto" />}
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

      <UserFormModal.component
        onSave={storeMutation.mutate}
        isSaving={storeMutation.isLoading}
      />
    </Container>
  )
}
