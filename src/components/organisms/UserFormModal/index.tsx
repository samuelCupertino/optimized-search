import { useEffect, useMemo } from 'react'
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
  onHide: () => void
  onSave: (userForm: IUserFormFields) => void
}

export const UserFormModal: React.FC<IUserFormModalProps> = ({
  isVisible,
  isSaving,
  values,
  errors,
  onHide,
  onSave,
}) => {
  const { control, formState, handleSubmit, reset } = useForm<IUserFormFields>({
    defaultValues: {
      avatar: '',
      name: '',
      email: '',
    },
    delayError: 500,
  })

  useEffect(() => {
    reset({
      avatar: values?.avatar ?? '',
      name: values?.name ?? '',
      email: values?.email ?? '',
    })
  }, [reset, values])

  const formErrors = useMemo(() => {
    const fieldErrors = Object.entries(formState.errors).reduce(
      (acc, [key, value]) =>
        value.message ? { ...acc, [key]: [value.message] } : acc,
      {}
    )

    return { ...errors, ...fieldErrors }
  }, [errors, formState])

  const handleSave: SubmitHandler<IUserFormFields> = (data) => {
    if (formState.isSubmitted) return
    onSave(data)
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
                  rules={{
                    pattern: {
                      value: /^http\S+$/,
                      message: 'Informe uma url válida.',
                    },
                  }}
                  render={({ field }) => (
                    <TextInput
                      {...field}
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
            <Button type="secondary" onClick={onHide}>
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
