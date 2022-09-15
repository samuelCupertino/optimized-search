import { useEffect } from 'react'
import { Button, Loading } from '@/src/components/atoms'
import {
  Modal,
  UserCardForm,
  IUserCardFormFields,
  useUserCardFormReducer,
} from '@/src/components/molecules'

export type IUserFormModalValues = Partial<
  Record<keyof IUserCardFormFields, string>
>

export type IUserFormModalErrors = Partial<
  Record<keyof IUserCardFormFields, string[]>
>

export interface IUserFormModalProps {
  isVisible: boolean
  isSaving?: boolean
  data?: IUserCardFormFields
  values?: IUserFormModalValues
  errors?: IUserFormModalErrors
  onHide: () => void
  onSave: (userCardForm: IUserCardFormFields) => void
}

export const UserFormModal: React.FC<IUserFormModalProps> = ({
  isVisible,
  isSaving,
  data,
  values,
  errors,
  onHide,
  onSave,
}) => {
  const { userCardFormState, userCardFormDispatch } = useUserCardFormReducer()

  useEffect(() => {
    data && userCardFormDispatch({ type: 'RESET', payload: data })
    values && userCardFormDispatch({ type: 'SET_VALUES', payload: values })
    errors && userCardFormDispatch({ type: 'SET_ERRORS', payload: errors })
  }, [data, values, errors, userCardFormDispatch])

  const handleSave = () => {
    if (isSaving) return

    const { name, email } = userCardFormState
    const isValide = name.value && email.value

    if (!isValide) {
      return userCardFormDispatch({
        type: 'SET_ERRORS',
        payload: {
          name: name.value ? [] : ['O campo nome é obrigatório.'],
          email: email.value ? [] : ['O campo e-mail é obrigatório.'],
        },
      })
    }

    onSave(userCardFormState)
  }

  const handleHide = () => {
    if (isSaving) return

    userCardFormDispatch({ type: 'RESET' })
    onHide()
  }

  return (
    <Modal
      title="CRIAÇÃO DE USUÁRIO"
      isVisible={isVisible}
      onClickOutside={handleHide}
      body={
        <UserCardForm
          data={userCardFormState}
          onChange={(field, value) => {
            userCardFormDispatch({
              type: 'SET',
              field,
              payload: { value, errors: [] },
            })
          }}
        />
      }
      footer={
        <>
          {!isSaving && (
            <Button type="secondary" onClick={handleHide}>
              Cancelar
            </Button>
          )}
          <Button
            type="primary"
            cursor={isSaving ? 'wait' : 'pointer'}
            onClick={handleSave}
          >
            {isSaving ? (
              <Loading
                size="18px"
                color="bgSecondary"
                bgColor="bgPrimary"
                margin="0 11.5px"
              />
            ) : (
              'Salvar'
            )}
          </Button>
        </>
      }
    />
  )
}
