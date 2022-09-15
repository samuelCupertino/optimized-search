import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { useUsers, IStoreUserError } from '@/src/services/hooks'

import { Button, Loading, Text } from '@/src/components/atoms'
import { IUserCardProps } from '@/src/components/molecules'
import { ListOfUserCard, UserFormModal } from '@/src/components/organisms'
import { Container, HeaderWrapper } from './styles'

export const OptimisticUIIndependent: React.FC = () => {
  const queryClient = useQueryClient()
  const [modalIsVisible, setModalIsVisible] = useState(false)
  const { fetchUsers, storeUser } = useUsers()

  const { data, isSuccess, isLoading, isError } = useQuery(
    ['users'],
    () => fetchUsers(),
    { refetchOnWindowFocus: false }
  )

  const storeMutation = useMutation(storeUser, {
    onMutate: async (userFormData) => {
      await queryClient.cancelQueries(['users'])
      const oldUsers =
        queryClient.getQueryData<IUserCardProps[]>(['users']) ?? []

      const uniqueString = new Date().getTime().toString(36)
      const optimisticUser: IUserCardProps = {
        ...userFormData,
        id: uniqueString.padEnd(10, uniqueString),
      }

      queryClient.setQueryData(['users'], [optimisticUser, ...oldUsers])

      return oldUsers
    },
    onError: (_error: IStoreUserError, _userFormData, oldUsers) => {
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
        <Button type="secondary" onClick={() => setModalIsVisible(true)}>
          + Adicionar Contato
        </Button>
      </HeaderWrapper>

      {isLoading && <Loading margin="40px auto" />}
      {isSuccess && data.length && (
        <ListOfUserCard users={data} showId={false} />
      )}
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
        isVisible={modalIsVisible}
        onHide={() => setModalIsVisible(false)}
        onSave={(userCardForm) => {
          storeMutation.mutate({
            name: userCardForm.name.value,
            email: userCardForm.email.value,
            avatar: userCardForm.avatar.value,
          })
        }}
        isSaving={storeMutation.isLoading}
      />
    </Container>
  )
}
