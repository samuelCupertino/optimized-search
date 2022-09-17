import { Container, IContainer, ButtonComponent } from './styles'

interface IButtonProps extends IContainer {
  children: React.ReactNode
  onClick?: () => void
}

export const Button: React.FC<IButtonProps> = ({
  children,
  onClick,
  type,
  color,
  margin,
  padding,
  ...props
}) => {
  return (
    <Container {...{ ...props, padding, margin, type, color }}>
      <ButtonComponent onClick={onClick} {...props}>
        {children}
      </ButtonComponent>
    </Container>
  )
}
