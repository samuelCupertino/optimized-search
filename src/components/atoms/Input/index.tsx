import { InputHTMLAttributes, forwardRef, ForwardedRef } from 'react'
import { InputComponent, IInputComponent } from './styles'

export type IInputProps = IInputComponent &
  InputHTMLAttributes<HTMLInputElement> & {
    ref: ForwardedRef<HTMLInputElement>
  }

export const Input: React.FC<IInputProps> = forwardRef<
  HTMLInputElement,
  IInputProps
>((props, ref) => <InputComponent {...props} ref={ref} />)
