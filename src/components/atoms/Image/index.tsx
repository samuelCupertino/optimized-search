import NextImage from "next/image";
import { Container, IContainer } from "./styles";

interface ImageProps extends IContainer {
  children: React.ReactNode;
}

export const Image: React.FC<ImageProps> = ({ children, ...props }) => (
  <Container {...props}>
    <NextImage src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
  </Container>
);
