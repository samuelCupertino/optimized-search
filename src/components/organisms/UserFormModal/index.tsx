import { useCallback, useEffect, useState } from 'react'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'

import { Button, Loading, Tooltip, Image, Hr } from '@/src/components/atoms'
import { Modal, TextInput } from '@/src/components/molecules'
import { ModalBody, AvatarWrapper, TextWrapper } from './styles'

export interface IUserFormFields {
  avatar: string
  name: string
  email: string
}

export type IUserFormErrors = Partial<Record<keyof IUserFormFields, string[]>>

export interface IUserFormModalProps {
  isVisible: boolean
  isSaving?: boolean
  values?: Partial<IUserFormFields> | null
  errors?: IUserFormErrors | null
  onCancel: () => void
  onSave: (userForm: IUserFormFields) => void
}

export const UserFormModal: React.FC<IUserFormModalProps> = ({
  isVisible,
  isSaving,
  values,
  errors,
  onCancel,
  onSave,
}) => {
  const { control, formState, handleSubmit, reset, setError, clearErrors } =
    useForm<IUserFormFields>({
      defaultValues: {
        avatar: '',
        name: '',
        email: '',
      },
      delayError: 500,
    })
  const [formErrors, setFormErrors] = useState<IUserFormErrors>({})

  useEffect(() => {
    reset({
      avatar: values?.avatar ?? '',
      name: values?.name ?? '',
      email: values?.email ?? '',
    })
  }, [reset, values])

  const updateFormErrors = useCallback(() => {
    const fieldErrors = Object.entries(formState.errors).reduce(
      (acc, [field, error]) =>
        error.message ? { ...acc, [field]: [error.message] } : acc,
      {}
    )

    setFormErrors(fieldErrors)
  }, [formState.errors])

  useEffect(() => {
    if (errors) {
      Object.entries(errors).forEach(([field, [message]]) => {
        setError(field as keyof IUserFormErrors, { type: 'custom', message })
      })
    }

    updateFormErrors()
  }, [errors, setError, updateFormErrors])

  const handleSave: SubmitHandler<IUserFormFields> = useCallback(
    (data) => {
      const hasErrors = Object.keys(formErrors).length > 0
      if (hasErrors) return
      onSave(data)
    },
    [formErrors, onSave]
  )

  const handleFocus = (field: keyof IUserFormFields) => {
    clearErrors(field)
    updateFormErrors()
  }

  return (
    <Modal
      title="CRIAÇÃO DE USUÁRIO"
      isVisible={isVisible}
      body={
        <ModalBody>
          <AvatarWrapper>
            <Tooltip
              direction="right"
              target={
                <Image
                  src={'/images/profile.png'}
                  alt={`foto do usuário a ser cadastrado`}
                  fallbackSrc="/images/profile.png"
                  border="3px solid"
                  borderRadius="50%"
                />
              }
              content={
                <Controller
                  name="avatar"
                  control={control}
                  // rules={{
                  //   pattern: {
                  //     value: /^http\S+$/,
                  //     message: 'Informe uma url válida.',
                  //   },
                  // }}
                  render={({ field }) => (
                    <TextInput
                      {...field}
                      onFocus={() => handleFocus('avatar')}
                      errors={formErrors.avatar}
                      placeholder="Url do avatar"
                      margin="0 10px 0"
                    />
                  )}
                />
              }
            />
          </AvatarWrapper>
          <TextWrapper>
            <Controller
              name="name"
              control={control}
              rules={{
                required: 'O campo nome é obrigatório.',
              }}
              render={({ field }) => (
                <TextInput
                  {...field}
                  onFocus={() => handleFocus('name')}
                  errors={formErrors.name}
                  placeholder="Nome"
                  margin="0 10px 0"
                />
              )}
            />
            <Hr />
            <Controller
              name="email"
              control={control}
              rules={{
                required: 'O campo e-mail é obrigatório.',
              }}
              render={({ field }) => (
                <TextInput
                  {...field}
                  onFocus={() => handleFocus('email')}
                  errors={formErrors.email}
                  placeholder="E-mail"
                  margin="0 10px 0"
                />
              )}
            />
          </TextWrapper>
        </ModalBody>
      }
      footer={
        <>
          {!isSaving && (
            <Button type="secondary" onClick={onCancel}>
              Cancelar
            </Button>
          )}
          <Button
            type="primary"
            cursor={isSaving ? 'wait' : 'pointer'}
            onClick={handleSubmit(handleSave)}
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

type IUseUserFormModal = Pick<
  IUserFormModalProps,
  'isVisible' | 'values' | 'errors'
>

export const useUserFormModal = (initialState?: IUseUserFormModal) => {
  const [userFormModal, setUserFormModal] = useState<IUseUserFormModal>({
    isVisible: initialState?.isVisible ?? false,
    values: initialState?.values ?? {},
    errors: initialState?.errors ?? {},
  })

  const set = useCallback(
    (newUserFormModal: Partial<IUseUserFormModal>) => {
      setUserFormModal({ ...userFormModal, ...newUserFormModal })
    },
    [userFormModal]
  )

  const setIsVisible = (isVisible: IUseUserFormModal['isVisible']) => {
    if (isVisible) set({ values: null, errors: null })
    setUserFormModal({ ...userFormModal, isVisible })
  }

  const setValues = (values: IUseUserFormModal['values']) => {
    setUserFormModal({ ...userFormModal, values })
  }

  const setErrors = (errors: IUseUserFormModal['errors']) => {
    setUserFormModal({ ...userFormModal, errors })
  }

  const component = useCallback(
    (props: {
      isSaving?: boolean
      onCancel?: IUserFormModalProps['onCancel']
      onSave: IUserFormModalProps['onSave']
    }) => (
      <UserFormModal
        isVisible={userFormModal.isVisible}
        isSaving={props.isSaving}
        values={userFormModal.values}
        errors={userFormModal.errors}
        onCancel={() => {
          set({ isVisible: false, values: null, errors: null })
          props.onCancel?.()
        }}
        onSave={props.onSave}
      />
    ),
    [userFormModal.errors, userFormModal.isVisible, userFormModal.values]
  )

  return {
    component,
    ...userFormModal,
    set,
    setIsVisible,
    setValues,
    setErrors,
  }
}
