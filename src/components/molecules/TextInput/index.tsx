import { forwardRef } from 'react'
import { Input, IInputProps, List } from '@/src/components/atoms'
import { Container, IContainer } from './styles'

export interface ITextInputProps extends IInputProps, IContainer {
  errors?: string[]
}

export const TextInput: React.FC<ITextInputProps> = forwardRef<
  HTMLInputElement,
  ITextInputProps
>(({ errors = [], margin, padding, ...props }, ref) => (
  <Container margin={margin} padding={padding}>
    <Input {...props} ref={ref} />
    {errors.length > 0 && (
      <List items={errors} color="danger" fontSize="tiny" />
    )}
  </Container>
))
