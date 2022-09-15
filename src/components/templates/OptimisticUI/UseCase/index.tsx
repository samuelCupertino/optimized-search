import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { useUsers, IStoreUserError } from '@/src/services/hooks'

import { Button, Loading, Text } from '@/src/components/atoms'
import { IUserCardProps } from '@/src/components/molecules'
import {
  ListOfUserCard,
  UserFormModal,
  IUserFormModalErrors,
} from '@/src/components/organisms'
import { Container, HeaderWrapper } from './styles'

export const OptimisticUIUseCase: React.FC = () => {
  const queryClient = useQueryClient()
  const [modalIsVisible, setModalIsVisible] = useState(false)
  const [userFormErrors, setUserFormErrors] = useState<IUserFormModalErrors>({})
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
      setModalIsVisible(false)
      setUserFormErrors({})
    },
    onError: (error: IStoreUserError, _userCardForm, oldUsers) => {
      if (error.status === 422) {
        setUserFormErrors(error.data)
      }

      queryClient.setQueryData(['users'], oldUsers)
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
      <HeaderWrapper>
        <Text type="primary" padding="10px">
          Lista de contatos:
        </Text>
        <Button type="secondary" onClick={() => setModalIsVisible(true)}>
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
        errors={userFormErrors}
      />
    </Container>
  )
}
