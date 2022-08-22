import { useEffect, useState } from "react";
import { Loading, Text } from "@/src/components/atoms";
import { Search } from "@/src/components/molecules";
import { ListOfUserCard } from "@/src/components/organisms";
import { Container } from "./styles";
import { useQuery } from "react-query";

interface IFetchUsersProps {
  name?: string;
  email?: string;
}
interface IFetchUsersProps {
  name?: string;
  email?: string;
}
const fetchUsers = async (where: IFetchUsersProps) => {
  const params = new URLSearchParams({
    name: where.name ?? "",
    email: where.email ?? "",
  });
  const response = await fetch(`api/users?${params}`);
  const data = await response.json();

  if (!response.ok) throw new Error(response.statusText);

  return data;
};

interface IUseDebounceData<T> {
  value: T;
  isWaiting: boolean;
}
const useDebounce = <T,>(
  value: T,
  delay: number = 500
): IUseDebounceData<T> => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timeoutId);
  }, [value, delay]);

  return { value: debouncedValue, isWaiting: debouncedValue !== value };
};

const FetchByTyping: React.FC = () => {
  const [search, setSearch] = useState("");
  const { isWaiting: isTyping } = useDebounce(search);

  const { data, isStale, isSuccess, isError } = useQuery(
    ["users", { name: search }],
    () => fetchUsers({ name: search }),
    { staleTime: 3 * 60 * 1000, enabled: !isTyping }
  );

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
  );
};

export default FetchByTyping;
