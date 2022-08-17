import UserCard, { IUserCardProps } from "../../molecules/UserCard";
import { Container, IContainer, List, Item } from "./styles";

interface IListOfUserCardProps extends IContainer {
  data: (IUserCardProps & { id: number })[];
}

const ListOfUserCard: React.FC<IListOfUserCardProps> = ({ data, ...props }) => (
  <Container {...props}>
    <List>
      {data.map(({ id, ...userProps }) => (
        <Item key={id}>
          <UserCard {...userProps} />
        </Item>
      ))}
    </List>
  </Container>
);

export default ListOfUserCard;
