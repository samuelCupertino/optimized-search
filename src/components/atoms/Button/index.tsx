import { ButtonComponent, IButtonComponent } from './styles'

interface IButtonProps extends IButtonComponent {
  children: React.ReactNode
  onClick?: () => void
}

const Button: React.FC<IButtonProps> = ({ children, onClick, ...props }) => {
  return (
    <ButtonComponent onClick={onClick} {...props}>
      {children}
    </ButtonComponent>
  )
}

export default Button