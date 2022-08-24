import { useState } from 'react'
import { useQuery } from 'react-query'
import { useDebounce } from '@/src/hooks'
import { useUsers } from '@/src/services/hooks'

import { Loading, Text } from '@/src/components/atoms'
import { Search } from '@/src/components/molecules'
import { ListOfUserCard } from '@/src/components/organisms'
import { Container } from './styles'

const FetchByTyping: React.FC = () => {
  const [search, setSearch] = useState('')
  const { isWaiting: isTyping } = useDebounce(search)
  const { fetchUsers } = useUsers()

  const { data, isStale, isSuccess, isError } = useQuery(
    ['users', { name: search }],
    () => fetchUsers({ name: search }),
    { staleTime: 3 * 60 * 1000, enabled: !isTyping }
  )

  return (
    <Container>
      <Search value={search} onChange={(e) => setSearch(e.target.value)} />
      {isStale && <Loading margin="40px auto" />}
      {!isStale && isSuccess && data.length && (
        <ListOfUserCard users={data} highlight={search} />
      )}
      {!isStale && isSuccess && data.length === 0 && (
        <Text type="primary" padding="10px">
          Nenhum usuário com esse nome foi encontrado.
        </Text>
      )}
      {!isStale && isError && (
        <Text type="primary" padding="10px">
          Erro ao buscar usuários! Tente novamente mais tarde.
        </Text>
      )}
    </Container>
  )
}

export default FetchByTyping
