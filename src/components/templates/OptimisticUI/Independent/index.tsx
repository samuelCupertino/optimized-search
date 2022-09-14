import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { useUsers, IStoreUserProps } from '@/src/services/hooks'

import { Button, Loading, Text } from '@/src/components/atoms'
import { Modal, UserCardForm } from '@/src/components/molecules'
import { ListOfUserCard } from '@/src/components/organisms'
import { Container, HeaderWrapper } from './styles'

const INITIAL_USER: IStoreUserProps = { avatar: '', name: '', email: '' }

export const OptimisticUIDependent: React.FC = () => {
  const queryClient = useQueryClient()
  const { storeUser, fetchUsers } = useUsers()
  const [modalIsVisible, setModalIsVisible] = useState(false)
  const [userCardFormData, setUserCardFormData] = useState(INITIAL_USER)
  const [userCardFormErrors, setUserCardFormErrors] = useState(INITIAL_USER)

  const { data, isSuccess, isLoading, isError } = useQuery(
    ['users'],
    () => fetchUsers(),
    { refetchOnWindowFocus: false }
  )

  const storeMutation = useMutation(storeUser, {
    onMutate: async (newUser: IStoreUserProps) => {
      await queryClient.cancelQueries(['users'])
      const oldUsers =
        queryClient.getQueryData<IStoreUserProps[]>(['users']) ?? []

      queryClient.setQueryData(['users'], [newUser, ...oldUsers])

      return oldUsers
    },
    onError: (_err, _newUser, oldUsers) => {
      queryClient.setQueryData(['users'], oldUsers)
    },
    onSettled: () => {
      queryClient.invalidateQueries(['users'])
    },
  })

  const modalAction = {
    show() {
      setModalIsVisible(true)
    },
    hide() {
      setUserCardFormErrors(INITIAL_USER)
      setUserCardFormData(INITIAL_USER)
      setModalIsVisible(false)
    },
    save(newUser: IStoreUserProps) {
      const isValide = newUser.name && newUser.email

      if (!isValide) {
        setUserCardFormErrors((oldErrors) => ({
          ...oldErrors,
          name: newUser.name ? '' : 'O campo nome é obrigatório.',
          email: newUser.email ? '' : 'O campo email é obrigatório.',
        }))
        return
      }

      this.hide()
      storeMutation.mutate(newUser)
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
            errors={userCardFormErrors}
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
