import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { useUsers, IStoreUserError } from '@/src/services/hooks'

import { IUser } from '@/src/lib/interfaces'
import { IUserCardFormError } from '@/src/components/molecules/UserCardForm'

import { Button, Loading, Text } from '@/src/components/atoms'
import { Modal, UserCardForm } from '@/src/components/molecules'
import { ListOfUserCard } from '@/src/components/organisms'
import { Container, HeaderWrapper } from './styles'

type IUserFormData = Omit<IUser, 'id'>
type IUserFormError = IUserCardFormError

const FORM_DATA: IUserFormData = { avatar: '', name: '', email: '' }
const FORM_ERROR: IUserFormError = { avatar: [], name: [], email: [] }

export const OptimisticUIDependent: React.FC = () => {
  const queryClient = useQueryClient()
  const { storeUser, fetchUsers } = useUsers()
  const [modalIsVisible, setModalIsVisible] = useState(false)
  const [userCardFormData, setUserCardFormData] = useState(FORM_DATA)
  const [userCardFormError, setUserCardFormError] = useState(FORM_ERROR)

  const { data, isSuccess, isLoading, isError } = useQuery(
    ['users'],
    () => fetchUsers(),
    { refetchOnWindowFocus: false }
  )

  const storeMutation = useMutation(storeUser, {
    onMutate: async (newUser: IUserFormData) => {
      await queryClient.cancelQueries(['users'])
      const oldUsers = queryClient.getQueryData<IUser[]>(['users']) ?? []

      const lastId = oldUsers[0]?.id ?? 0
      const optimisticUser: IUser = {
        ...newUser,
        id: lastId + 1,
        loading: ['id'],
      }

      queryClient.setQueryData(['users'], [optimisticUser, ...oldUsers])

      return oldUsers
    },
    onError: (error: IStoreUserError, newUser, oldUsers) => {
      if (error.status === 422) {
        modalAction.show({ data: newUser, errors: error.data })
      }
      queryClient.setQueryData(['users'], oldUsers)
    },
    onSettled: () => {
      queryClient.invalidateQueries(['users'])
    },
    retry: (failureCount, error: IStoreUserError) => {
      if (error.status < 500) return false
      return failureCount < 3
    },
  })

  const modalAction = {
    show: (user?: { data?: IUserFormData; errors?: IUserFormError }) => {
      setUserCardFormData(user?.data ?? FORM_DATA)
      setUserCardFormError(user?.errors ?? FORM_ERROR)
      setModalIsVisible(true)
    },
    hide: () => setModalIsVisible(false),
    save: (newUser: IUserFormData) => {
      setUserCardFormError({
        name: newUser.name ? [] : ['O campo nome é obrigatório.'],
        email: newUser.email ? [] : ['O campo email é obrigatório.'],
      })

      storeMutation.mutate(newUser)
      setModalIsVisible(false)
    },
  }

  return (
    <Container>
      <HeaderWrapper>
        <Text type="primary" padding="10px">
          Lista de contatos:
        </Text>
        <Button type="secondary" onClick={modalAction.show}>
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

      <Modal
        title="CRIAÇÃO DE USUÁRIO"
        isVisible={modalIsVisible}
        onClickOutside={modalAction.hide}
        body={
          <UserCardForm
            {...userCardFormData}
            errors={userCardFormError}
            onChangeName={(name = '') => {
              setUserCardFormData((oldData) => ({ ...oldData, name }))
            }}
            onChangeEmail={(email = '') => {
              setUserCardFormData((oldData) => ({ ...oldData, email }))
            }}
            onChangeAvatar={(avatar = '') => {
              setUserCardFormData((oldData) => ({ ...oldData, avatar }))
            }}
          />
        }
        footer={
          <>
            <Button type="secondary" onClick={modalAction.hide}>
              Cancelar
            </Button>
            <Button
              type="primary"
              onClick={() => modalAction.save(userCardFormData)}
            >
              Salvar
            </Button>
          </>
        }
      />
    </Container>
  )
}

export default OptimisticUIDependent
