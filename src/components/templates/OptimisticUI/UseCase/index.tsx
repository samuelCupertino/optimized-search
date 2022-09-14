import { useState, useReducer } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { useUsers, IStoreUserError } from '@/src/services/hooks'

import { IUserCardProps } from '@/src/components/molecules/UserCard'
import { IUserCardFormProps } from '@/src/components/molecules/UserCardForm'

import { Button, Loading, Text } from '@/src/components/atoms'
import { Modal, UserCardForm } from '@/src/components/molecules'
import { ListOfUserCard } from '@/src/components/organisms'
import { Container, HeaderWrapper } from './styles'

interface IUserForm {
  data: Pick<IUserCardFormProps, 'name' | 'email' | 'avatar'>
  errors: IUserCardFormProps['errors']
}

const FORM_USER: IUserForm = {
  data: { avatar: '', name: '', email: '' },
  errors: { avatar: [], name: [], email: [] },
}

interface IUserFormAction {
  type: 'UPDATE'
  payload: IUserForm | Pick<IUserForm, 'data'> | Pick<IUserForm, 'errors'>
}

const userFormReducer = (state: IUserForm, action: IUserFormAction) => {
  switch (action.type) {
    case 'UPDATE':
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}

export const OptimisticUIUseCase: React.FC = () => {
  const queryClient = useQueryClient()
  const [modalIsVisible, setModalIsVisible] = useState(false)
  const [userCardFormState, userCardFormDispatch] = useReducer<
    (state: IUserForm, action: IUserFormAction) => IUserForm
  >(userFormReducer, FORM_USER)
  const { storeUser, fetchUsers } = useUsers()

  const { data, isSuccess, isFetching, isError } = useQuery(
    ['users'],
    () => fetchUsers(),
    { refetchOnWindowFocus: false }
  )

  const storeMutation = useMutation(storeUser, {
    onMutate: async () => {
      await queryClient.cancelQueries(['users'])
      const oldUsers =
        queryClient.getQueryData<IUserCardProps[]>(['users']) ?? []

      return oldUsers
    },
    onSuccess: () => {
      setModalIsVisible(false)
      queryClient.invalidateQueries(['users'])
    },
    onError: (error: IStoreUserError, _userFormData, oldUsers) => {
      if (error.status === 422) {
        userCardFormDispatch({
          type: 'UPDATE',
          payload: { errors: { ...userCardFormState.errors, ...error.data } },
        })
      }

      queryClient.setQueryData(['users'], oldUsers)
    },
    retry: (failureCount, error: IStoreUserError) => {
      return error.isServerError ? failureCount < 3 : false
    },
  })

  const modalAction = {
    show: (user?: IUserForm) => {
      userCardFormDispatch({
        type: 'UPDATE',
        payload: {
          data: {
            ...userCardFormState.data,
            ...(user?.data ?? FORM_USER.data),
          },
          errors: {
            ...userCardFormState.errors,
            ...(user?.errors ?? FORM_USER.errors),
          },
        },
      })
      setModalIsVisible(true)
    },
    hide: () => setModalIsVisible(false),
    save: (userFormData: IUserForm['data']) => {
      const isValide = userFormData.name && userFormData.email

      if (!isValide) {
        return userCardFormDispatch({
          type: 'UPDATE',
          payload: {
            errors: {
              ...userCardFormState.errors,
              name: userFormData.name ? [] : ['O campo nome é obrigatório.'],
              email: userFormData.email
                ? []
                : ['O campo e-mail é obrigatório.'],
            },
          },
        })
      }

      storeMutation.mutate(userFormData)
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

      <Modal
        title="CRIAÇÃO DE USUÁRIO"
        isVisible={modalIsVisible}
        onClickOutside={() => !storeMutation.isLoading && modalAction.hide()}
        body={
          <UserCardForm
            {...userCardFormState.data}
            errors={userCardFormState.errors}
            onChangeName={(name = '') => {
              userCardFormDispatch({
                type: 'UPDATE',
                payload: { data: { ...userCardFormState.data, name } },
              })
            }}
            onChangeEmail={(email = '') => {
              userCardFormDispatch({
                type: 'UPDATE',
                payload: { data: { ...userCardFormState.data, email } },
              })
            }}
            onChangeAvatar={(avatar = '') => {
              userCardFormDispatch({
                type: 'UPDATE',
                payload: { data: { ...userCardFormState.data, avatar } },
              })
            }}
          />
        }
        footer={
          <>
            {!storeMutation.isLoading && (
              <Button type="secondary" onClick={modalAction.hide}>
                Cancelar
              </Button>
            )}
            <Button
              type="primary"
              cursor={storeMutation.isLoading ? 'wait' : 'pointer'}
              onClick={() =>
                !storeMutation.isLoading &&
                modalAction.save(userCardFormState.data)
              }
            >
              {storeMutation.isLoading ? (
                <Loading
                  size="18px"
                  color="bgSecondary"
                  bgColor="bgPrimary"
                  margin="0 11.5px"
                />
              ) : (
                'Salvar'
              )}
            </Button>
          </>
        }
      />
    </Container>
  )
}

export default OptimisticUIUseCase
