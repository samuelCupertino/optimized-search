import { useQuery } from 'react-query'
import { useUsers } from '@/src/services/hooks'

import { Button, Loading, Text } from '@/src/components/atoms'
import { ListOfUserCard } from '@/src/components/organisms'
import { Container, HeaderWrapper } from './styles'

const OptimisticUI: React.FC = () => {
  const { fetchUsers } = useUsers()

  const { data, isLoading, isSuccess } = useQuery(['users'], () =>
    fetchUsers({ length: 2 })
  )

  return (
    <Container>
      {isLoading && <Loading margin="40px auto" />}
      {isSuccess && data.length && (
        <>
          <HeaderWrapper>
            <Text type="primary" padding="10px">
              Lista de contatos:
            </Text>
            <Button type="secondary">+ Adicionar Contato</Button>
          </HeaderWrapper>

          <ListOfUserCard users={data} />
        </>
      )}
    </Container>
  )
}

export default OptimisticUI
