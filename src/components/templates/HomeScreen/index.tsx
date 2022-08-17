import { Search } from "../../molecules";
import { ListOfUserCard } from "../../organisms";
import { Container } from "./styles";

interface IHomeScreenProps {
  // data: string[];
}

const HomeScreen: React.FC<IHomeScreenProps> = ({}) => (
  <Container>
    <Search value={"ola"} onChange={() => {}} />
    <ListOfUserCard
      data={[
        {
          id: 1,
          avatar: "https://i.pravatar.cc/300",
          name: "João",
          email: "joao@email.com",
        },
        {
          id: 2,
          avatar: "https://i.pravatar.cc/300",
          name: "João",
          email: "joao@email.com",
        },
      ]}
    />
  </Container>
);

export default HomeScreen;
