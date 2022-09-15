import { useReducer } from 'react'
import { Image, Hr, Tooltip, Input, List } from '@/src/components/atoms'
import { Container, IContainer, AvatarWrapper, TextWrapper } from './styles'

export interface IUserCardFormField {
  value: string
  errors: string[]
}
export interface IUserCardFormFields {
  avatar: IUserCardFormField
  name: IUserCardFormField
  email: IUserCardFormField
}
export interface IUserCardFormProps extends IContainer {
  data: IUserCardFormFields
  onChange: (field: keyof IUserCardFormFields, value: string) => void
}

export const UserCardForm: React.FC<IUserCardFormProps> = ({
  data: { avatar, name, email },
  onChange,
  margin,
  padding,
}) => (
  <Container margin={margin} padding={padding}>
    <AvatarWrapper>
      <Tooltip
        direction="right"
        target={
          <Image
            src={avatar.value || '/images/profile.png'}
            alt={`foto do usuário ${name.value}`}
            fallbackSrc="/images/profile.png"
            border="3px solid"
            borderRadius="50%"
          />
        }
        content={
          <>
            <Input
              value={avatar.value}
              onChange={(e) => onChange('avatar', e.target.value)}
              placeholder="URL do avatar"
            />
            {avatar.errors.length > 0 && (
              <List
                items={avatar.errors}
                color="danger"
                fontSize="tiny"
                margin="0 15px"
              />
            )}
          </>
        }
      />
    </AvatarWrapper>
    <TextWrapper>
      <Input
        value={name.value}
        onChange={(e) => onChange('name', e.target.value)}
        placeholder="Nome"
        padding="10px"
        margin="0 10px 0"
      />
      {name.errors.length > 0 && (
        <List
          items={name.errors}
          color="danger"
          fontSize="tiny"
          margin="0 15px"
        />
      )}
      <Hr />
      <Input
        value={email.value}
        onChange={(e) => onChange('email', e.target.value)}
        placeholder="Email"
        padding="10px"
        margin="0 10px 0"
      />
      {email.errors.length > 0 && (
        <List
          items={email.errors}
          color="danger"
          fontSize="tiny"
          margin="0 15px"
        />
      )}
    </TextWrapper>
  </Container>
)

interface IUserCardFormSet {
  type: 'SET'
  field: keyof IUserCardFormFields
  payload: Partial<IUserCardFormField>
}
interface IUserCardFormSetValues {
  type: 'SET_VALUES'
  payload: Partial<Record<string, string>>
}
interface IUserCardFormSetErros {
  type: 'SET_ERRORS'
  payload: Partial<Record<string, string[]>>
}
interface IUserCardFormReset {
  type: 'RESET'
  payload?: Partial<IUserCardFormFields>
}

type IUserCardFormAction =
  | IUserCardFormSet
  | IUserCardFormSetValues
  | IUserCardFormSetErros
  | IUserCardFormReset

export const useUserCardFormReducer = (initialState?: IUserCardFormFields) => {
  const INITIAL_FORM: IUserCardFormFields = {
    name: { value: '', errors: [] },
    email: { value: '', errors: [] },
    avatar: { value: '', errors: [] },
  }

  const userCardFormReducer = (
    state: IUserCardFormFields,
    action: IUserCardFormAction
  ) => {
    switch (action.type) {
      case 'SET': {
        return {
          ...state,
          [action.field]: { ...state[action.field], ...action.payload },
        }
      }
      case 'SET_VALUES': {
        const newState = Object.entries(state).reduce(
          (acc, [fieldKey, fieldProps]) => {
            const newFieldProps = {
              ...fieldProps,
              value: action.payload[fieldKey] ?? '',
            }

            return { ...acc, [fieldKey]: newFieldProps }
          },
          {} as IUserCardFormFields
        )

        return newState
      }
      case 'SET_ERRORS': {
        const newState = Object.entries(state).reduce(
          (acc, [fieldKey, fieldProps]) => {
            const newFieldProps = {
              ...fieldProps,
              errors: action.payload[fieldKey] ?? [],
            }

            return { ...acc, [fieldKey]: newFieldProps }
          },
          {} as IUserCardFormFields
        )

        return newState
      }
      case 'RESET': {
        return {
          ...state,
          ...(action.payload ?? INITIAL_FORM),
        }
      }
      default:
        return state
    }
  }

  const [userCardFormState, userCardFormDispatch] = useReducer(
    userCardFormReducer,
    initialState ?? INITIAL_FORM
  )

  return { userCardFormState, userCardFormDispatch }
}
