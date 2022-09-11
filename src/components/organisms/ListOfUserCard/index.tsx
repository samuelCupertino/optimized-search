import UserCard, { IUserCardProps } from '@/src/components/molecules/UserCard'
import { Container, IContainer, List, Item } from './styles'

interface IListOfUserCardProps extends IContainer {
  highlight?: string
  users: IUserCardProps[]
  hidden?: IUserCardProps['hidden']
}

export const ListOfUserCard: React.FC<IListOfUserCardProps> = ({
  users,
  highlight,
  hidden,
  ...props
}) => (
  <Container {...props}>
    <List>
      {users.map((user) => (
        <Item key={user.email}>
          <UserCard {...user} hidden={hidden} highlight={highlight} />
        </Item>
      ))}
    </List>
  </Container>
)

export default ListOfUserCard
