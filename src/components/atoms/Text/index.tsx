import { TextComponent, ITextComponent, TextHighlight } from './styles'

interface ITextProps extends ITextComponent {
  as?: React.ElementType
  children: React.ReactNode
  highlight?: string
  contentEditable?: boolean
  loading?: boolean
  onInput?: (event: React.FormEvent<HTMLInputElement>) => void
}

const formatHighlight = (children: React.ReactNode, highlight: string) => {
  const text = children?.toString() ?? highlight
  const splitText = text.split(
    RegExp(`(?=${highlight})|(?<=${highlight})`, 'i')
  )

  const formattedText = splitText.map((text: string, i: number) => {
    const isHighlight = text.toLowerCase() === highlight.toLowerCase()
    return isHighlight ? <TextHighlight key={i}>{text}</TextHighlight> : text
  })

  return formattedText
}

export const Text: React.FC<ITextProps> = ({
  children,
  highlight,
  loading,
  ...props
}) => {
  const text = highlight ? formatHighlight(children, highlight) : children

  return (
    <TextComponent {...props} className={loading && 'anim-loading'}>
      {text}
    </TextComponent>
  )
}
