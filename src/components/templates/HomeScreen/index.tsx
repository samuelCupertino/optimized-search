import { useEffect, useState } from "react";
import { Loading, Text } from "../../atoms";
import { Search } from "../../molecules";
import { ListOfUserCard } from "../../organisms";
import { Container } from "./styles";

interface IHomeScreenProps {
  // data: string[];
}

const HomeScreen: React.FC<IHomeScreenProps> = ({}) => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timeoutId = setTimeout(async () => {
      try {
        const response = await fetch(`api/users?name=${search}`);
        const { data } = await response.json();
        setUsers(data);
      } catch (err) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [search]);

  return (
    <Container>
      <Search value={search} onChange={(e) => setSearch(e.target.value)} />
      {isLoading ? (
        <Loading margin="40px auto" />
      ) : (
        <ListOfUserCard data={users} highlight={search} />
      )}
      {isError && (
        <Text type="title" padding="10px">
          Erro ao buscar usuários! Tente novamente mais tarde.
        </Text>
      )}
    </Container>
  );
};

export default HomeScreen;
