import UserCard, { IUserCardProps } from '@/src/components/molecules/UserCard'
import { Container, IContainer, List, Item } from './styles'

interface IListOfUserCardProps extends IContainer {
  highlight?: string
  users: IUserCardProps[]
}

export const ListOfUserCard: React.FC<IListOfUserCardProps> = ({
  users,
  highlight,
  ...props
}) => (
  <Container {...props}>
    <List>
      {users.map((user) => (
        <Item key={user.id}>
          <UserCard {...user} highlight={highlight} />
        </Item>
      ))}
    </List>
  </Container>
)

export default ListOfUserCard
