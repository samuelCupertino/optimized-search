import Image from "next/image";
import { Container, IContainer } from "./styles";

interface ITextProps extends IContainer {
  children: React.ReactNode;
}

export const Text: React.FC<ITextProps> = ({ children, ...props }) => (
  <Container {...props}>
    <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
  </Container>
);
