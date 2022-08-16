import { TextComponent, ITextComponent, TextHighlight } from "./styles";

interface ITextProps extends ITextComponent {
  as?: React.ElementType;
  children: React.ReactNode;
  highlight?: string;
}

const formatHighlight = (children: React.ReactNode, highlight: string) => {
  const text = children?.toString() ?? highlight;
  const splitText = text.split(
    RegExp(`(?=${highlight})|(?<=${highlight})`, "i")
  );

  const formattedText = splitText.map((text: string, i: number) => {
    const isHighlight = text.toLowerCase() === highlight.toLowerCase();
    return isHighlight ? <TextHighlight key={i}>{text}</TextHighlight> : text;
  });

  return formattedText;
};

const Text: React.FC<ITextProps> = ({ children, as, highlight, ...props }) => {
  const text = highlight ? formatHighlight(children, highlight) : children;

  return (
    <TextComponent as={as} {...props}>
      {text}
    </TextComponent>
  );
};

export default Text;
