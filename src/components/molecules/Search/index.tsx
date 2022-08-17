import { useContext, useId } from "react";
import { ThemeContext } from "styled-components";
import { Text, Input } from "../../atoms";
import { Container, IContainer } from "./styles";

interface ISearchProps extends IContainer {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Search: React.FC<ISearchProps> = ({ value, onChange, ...props }) => {
  const theme = useContext(ThemeContext);
  const inputId = useId();

  return (
    <Container {...props}>
      <Text
        as="label"
        htmlFor={inputId}
        fontSize={theme.sizes.medium}
        color={theme.colors.textTertiary}
        bgColor={theme.colors.bgPrimary}
        padding="10px 20px"
      >
        Buscar:
      </Text>
      <Input
        id={inputId}
        bgColor={theme.colors.bgSecondary}
        {...{ value, onChange }}
      />
    </Container>
  );
};

export default Search;
