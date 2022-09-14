import { InputHTMLAttributes } from 'react'
import { InputComponent, IInputComponent } from './styles'

interface IInputProps
  extends IInputComponent,
    InputHTMLAttributes<HTMLInputElement> {}

export const Input: React.FC<IInputProps> = (props) => (
  <InputComponent {...props} />
)
