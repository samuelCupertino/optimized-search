import { Image, Hr, Tooltip, Input, Text } from '@/src/components/atoms'
import { Container, IContainer, AvatarWrapper, TextWrapper } from './styles'

interface IUserCardFormError extends IContainer {
  name?: string[]
  email?: string[]
  avatar?: string[]
}

export interface IUserCardFormProps extends IContainer {
  name: string
  email: string
  avatar: string
  errors?: IUserCardFormError
  onChangeName: (value?: string) => void
  onChangeEmail: (value?: string) => void
  onChangeAvatar: (value?: string) => void
  onFocusName?: () => void
  onFocusEmail?: () => void
  onFocusAvatar?: () => void
}

export const UserCardForm: React.FC<IUserCardFormProps> = ({
  avatar,
  name,
  email,
  errors = {},
  onChangeName,
  onChangeEmail,
  onChangeAvatar,
  onFocusName,
  onFocusEmail,
  onFocusAvatar,
  margin,
  padding,
}) => (
  <Container margin={margin} padding={padding}>
    <AvatarWrapper>
      <Tooltip
        direction="right"
        target={
          <Image
            src={avatar || '/images/profile.png'}
            alt={`foto do usuário ${name}`}
            fallbackSrc="/images/profile.png"
            border="3px solid"
            borderRadius="50%"
          />
        }
        content={
          <Input
            value={avatar}
            onChange={(e) => onChangeAvatar(e.target.value)}
            onFocus={onFocusAvatar}
            placeholder="URL do avatar"
          />
        }
      />
    </AvatarWrapper>
    <TextWrapper>
      <Input
        value={name}
        onChange={(e) => onChangeName(e.target.value)}
        onFocus={onFocusName}
        placeholder="Nome"
        padding="10px"
        margin="0 10px 0"
      />
      {errors.name?.map((error) => (
        <Text
          key={error}
          as="p"
          fontSize="tiny"
          color="danger"
          margin="5px 10px"
        >
          {error}
        </Text>
      ))}
      <Hr />
      <Input
        value={email}
        onChange={(e) => onChangeEmail(e.target.value)}
        onFocus={onFocusEmail}
        placeholder="Email"
        padding="10px"
        margin="0 10px 0"
      />
      {errors.email?.map((error) => (
        <Text
          key={error}
          as="p"
          fontSize="tiny"
          color="danger"
          margin="5px 10px"
        >
          {error}
        </Text>
      ))}
    </TextWrapper>
  </Container>
)

export default UserCardForm
