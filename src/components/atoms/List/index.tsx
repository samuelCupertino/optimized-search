import { Container, IContainer, Item } from './styles'

interface IList extends IContainer {
  items: string[]
}

export const List: React.FC<IList> = ({ items, ...props }) => (
  <Container {...props}>
    {items.map((item, index) => (
      <Item key={index}>{item}</Item>
    ))}
  </Container>
)
