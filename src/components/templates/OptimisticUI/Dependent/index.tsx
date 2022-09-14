import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { useUsers, IStoreUserError } from '@/src/services/hooks'

import { IUserCardProps } from '@/src/components/molecules/UserCard'
import { IUserCardFormProps } from '@/src/components/molecules/UserCardForm'
import { IMessage } from '@/src/components/organisms/ListOfMessage'

import { Button, Loading, Text } from '@/src/components/atoms'
import { Modal, UserCardForm } from '@/src/components/molecules'
import { ListOfMessage, ListOfUserCard } from '@/src/components/organisms'
import { Container, HeaderWrapper } from './styles'

type IUserFormData = Pick<IUserCardFormProps, 'name' | 'email' | 'avatar'>
type IUserFormError = IUserCardFormProps['errors']

const FORM_DATA: IUserFormData = { avatar: '', name: '', email: '' }
const FORM_ERROR: IUserFormError = { avatar: [], name: [], email: [] }

export const OptimisticUIDependent: React.FC = () => {
  const queryClient = useQueryClient()
  const [modalIsVisible, setModalIsVisible] = useState(false)
  const [userCardFormData, setUserCardFormData] = useState(FORM_DATA)
  const [userCardFormError, setUserCardFormError] = useState(FORM_ERROR)
  const [errorMessages, setErrorMessages] = useState<IMessage[]>([])
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
        loading: ['id'],
      }

      queryClient.setQueryData(['users'], [optimisticUser, ...oldUsers])

      return oldUsers
    },
    onError: (error: IStoreUserError, userFormData, oldUsers) => {
      queryClient.setQueryData(['users'], oldUsers)

      if (error.status === 422) {
        return setErrorMessages((oldMessages) => [
          ...oldMessages,
          {
            id: oldMessages.length,
            type: 'warning',
            title: 'Informações invalidas!',
            text: `As informações do usuário '${userFormData.name}' são invalidas. Clique aqui para editar.`,
            onClick: () => {
              modalAction.show({ data: userFormData, errors: error.data })
              setErrorMessages(oldMessages)
            },
            onClose: () => setErrorMessages(oldMessages),
          },
        ])
      }

      setErrorMessages((oldMessages) => [
        ...oldMessages,
        {
          id: oldMessages.length,
          type: 'danger',
          title: 'Oops... Erro inesperado!',
          text: `Ocorreu um erro ao salvar o usuário '${userFormData.name}'. Clique aqui para tentar novamente.`,
          onClick: () => {
            modalAction.show({ data: userFormData, errors: error.data })
            setErrorMessages(oldMessages)
          },
          onClose: () => setErrorMessages(oldMessages),
        },
      ])
    },
    onSettled: () => {
      queryClient.invalidateQueries(['users'])
    },
    retry: (failureCount, error: IStoreUserError) => {
      return error.isServerError ? failureCount < 3 : false
    },
  })

  const modalAction = {
    show: (user?: { data?: IUserFormData; errors?: IUserFormError }) => {
      setUserCardFormData(user?.data ?? FORM_DATA)
      setUserCardFormError(user?.errors ?? FORM_ERROR)
      setModalIsVisible(true)
    },
    hide: () => setModalIsVisible(false),
    save: (userFormData: IUserFormData) => {
      const isValide = userFormData.name && userFormData.email

      if (!isValide) {
        return setUserCardFormError({
          name: userFormData.name ? [] : ['O campo nome é obrigatório.'],
          email: userFormData.email ? [] : ['O campo e-mail é obrigatório.'],
        })
      }

      storeMutation.mutate(userFormData)
      setModalIsVisible(false)
    },
  }

  return (
    <Container>
      {!!errorMessages.length && <ListOfMessage messages={errorMessages} />}
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
            onChangeName={(name = '') => {
              setUserCardFormData((oldData) => ({ ...oldData, name }))
            }}
            onChangeEmail={(email = '') => {
              setUserCardFormData((oldData) => ({ ...oldData, email }))
            }}
            onChangeAvatar={(avatar = '') => {
              setUserCardFormData((oldData) => ({ ...oldData, avatar }))
            }}
            errors={userCardFormError}
            onFocusName={() => {
              setUserCardFormError((oldError) => ({ ...oldError, name: [] }))
            }}
            onFocusEmail={() => {
              setUserCardFormError((oldError) => ({ ...oldError, email: [] }))
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
