import { useState } from 'react'
import { useQuery } from 'react-query'
import { useDebounce } from '@/src/hooks'
import { useUsers } from '@/src/services/hooks'

import { Loading, Text } from '@/src/components/atoms'
import { Search } from '@/src/components/molecules'
import { ListOfUserCard } from '@/src/components/organisms'
import { Container } from './styles'

export const FetchByTyping: React.FC = () => {
  const [search, setSearch] = useState('')
  const { isWaiting: isTyping } = useDebounce(search)
  const { fetchUsers } = useUsers()

  const { data, isStale, isSuccess, isError } = useQuery(
    ['users', { name: search }],
    () => fetchUsers({ name: search }),
    { staleTime: 2 * 60 * 1000, enabled: !isTyping }
  )

  return (
    <Container>
      <Search value={search} onChange={(e) => setSearch(e.target.value)} />
      {isStale && <Loading margin="40px auto" />}
      {isSuccess && data.length && (
        <ListOfUserCard
          users={data}
          highlight={search}
          height="calc(100vh - 80px)"
        />
      )}
      {isSuccess && data.length === 0 && (
        <Text type="primary" padding="10px">
          Nenhum usuário com esse nome foi encontrado.
        </Text>
      )}
      {isError && (
        <Text type="primary" padding="10px">
          Erro ao buscar usuários! Tente novamente mais tarde.
        </Text>
      )}
    </Container>
  )
}
