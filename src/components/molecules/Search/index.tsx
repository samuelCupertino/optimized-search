import { Text, Input } from "../../atoms";
import { Container, IContainer } from "./styles";

interface ISearchProps extends IContainer {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Search: React.FC<ISearchProps> = ({ value, onChange, ...props }) => (
  <Container {...props}>
    <Text
      fontSize="medium"
      color="textTertiary"
      bgColor="bgPrimary"
      padding="10px 20px"
    >
      Buscar:
    </Text>
    <Input bgColor="bgSecondary" {...{ value, onChange }} />
  </Container>
);

export default Search;
