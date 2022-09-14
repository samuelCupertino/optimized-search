import { UserCard, IUserCardProps } from '@/src/components/molecules/UserCard'
import { Container, IContainer, List, Item } from './styles'

interface IListOfUserCardProps extends IContainer {
  users: IUserCardProps[]
  showId?: boolean
  highlight?: string
}

export const ListOfUserCard: React.FC<IListOfUserCardProps> = ({
  users,
  showId,
  highlight,
  ...props
}) => (
  <Container {...props}>
    <List>
      {users.map((user) => (
        <Item key={user.id}>
          <UserCard {...user} highlight={highlight} showId={showId} />
        </Item>
      ))}
    </List>
  </Container>
)
