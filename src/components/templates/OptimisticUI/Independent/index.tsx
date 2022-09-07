import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { useUsers, IStoreUserProps } from '@/src/services/hooks'

import { Button, Loading, Text } from '@/src/components/atoms'
import { Modal, FormUserCard } from '@/src/components/molecules'
import { ListOfUserCard } from '@/src/components/organisms'
import { Container, HeaderWrapper } from './styles'

export const OptimisticUIIndependent: React.FC = () => {
  const queryClient = useQueryClient()
  const { storeUser, fetchUsers } = useUsers()
  const [modalIsVisible, setModalIsVisible] = useState(false)
  const [newUser, setNewUser] = useState<IStoreUserProps>({
    avatar: '',
    name: '',
    email: '',
  })

  const { data, isSuccess, isLoading } = useQuery(
    ['users'],
    () => fetchUsers({ length: 3 }),
    { refetchOnWindowFocus: false }
  )

  const storeMutation = useMutation(storeUser, {
    onMutate: async (newUser: IStoreUserProps) => {
      setModalIsVisible(false)
      await queryClient.cancelQueries(['users'])
      const previousUsers =
        queryClient.getQueryData<IStoreUserProps[]>(['users']) ?? []

      queryClient.setQueryData(
        ['users'],
        (oldUsers: IStoreUserProps[] = []) => [newUser, ...oldUsers]
      )

      return previousUsers
    },
    onError: (_err, _newUser, previousUsers) => {
      queryClient.setQueryData(['users'], previousUsers)
    },
    onSettled: () => {
      queryClient.invalidateQueries(['users'])
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

      {isSuccess && data.length && <ListOfUserCard users={data} />}

      <Modal
        title="CRIAÇÃO DE USUÁRIO"
        isVisible={modalIsVisible}
        onClickOutside={() => setModalIsVisible(false)}
        body={
          <FormUserCard
            {...newUser}
            onChangeName={(name = '') => {
              setNewUser((old) => ({ ...old, name }))
            }}
            onChangeEmail={(email = '') => {
              setNewUser((old) => ({ ...old, email }))
            }}
            onChangeAvatar={(avatar = '') => {
              setNewUser((old) => ({ ...old, avatar }))
            }}
          />
        }
        footer={
          <>
            <Button type="secondary" onClick={() => setModalIsVisible(false)}>
              Cancelar
            </Button>
            <Button
              type="primary"
              onClick={() => storeMutation.mutate(newUser)}
            >
              Salvar
            </Button>
          </>
        }
      />
    </Container>
  )
}

export default OptimisticUIIndependent
