import UserCard, { IUserCardProps } from "../../molecules/UserCard";
import { Container, IContainer, List, Item } from "./styles";

interface IListOfUserCardProps extends IContainer {
  highlight?: string;
  data: (IUserCardProps & { id: string })[];
}

const ListOfUserCard: React.FC<IListOfUserCardProps> = ({
  data,
  highlight,
  ...props
}) => (
  <Container {...props}>
    <List>
      {data.map(({ id, ...userProps }) => (
        <Item key={id}>
          <UserCard {...userProps} highlight={highlight} />
        </Item>
      ))}
    </List>
  </Container>
);

export default ListOfUserCard;
