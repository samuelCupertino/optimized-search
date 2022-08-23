import { InputHTMLAttributes } from 'react'
import { InputComponent, IInputComponent } from './styles'

interface IInputProps
  extends IInputComponent,
    InputHTMLAttributes<HTMLInputElement> {}

const Input: React.FC<IInputProps> = (props) => <InputComponent {...props} />

export default Input
