import { TextComponent, ITextComponent } from "./styles";

interface ITextProps extends ITextComponent {
  as?: React.ElementType;
  children: React.ReactNode;
}

export const Text: React.FC<ITextProps> = ({ children, as, ...props }) => (
  <TextComponent as={as} {...props}>
    {children}
  </TextComponent>
);
