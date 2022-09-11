import { Image, Hr, Tooltip, Input, Text } from '@/src/components/atoms'
import { Container, IContainer, AvatarWrapper, TextWrapper } from './styles'

interface IUserCardFormErrorsProps extends IContainer {
  name?: string
  email?: string
  avatar?: string
}

export interface IUserCardFormProps extends IContainer {
  name: string
  email: string
  avatar: string
  errors?: IUserCardFormErrorsProps
  onChangeName: (value?: string) => void
  onChangeEmail: (value?: string) => void
  onChangeAvatar: (value?: string) => void
}

export const UserCardForm: React.FC<IUserCardFormProps> = ({
  avatar,
  name,
  email,
  errors = {},
  onChangeName,
  onChangeEmail,
  onChangeAvatar,
  margin,
  padding,
}) => (
  <Container margin={margin} padding={padding}>
    <AvatarWrapper>
      <Tooltip
        direction="right"
        target={
          <Image
            src={avatar}
            alt={`foto do usuário ${name}`}
            border="3px solid"
            borderRadius="50%"
          />
        }
        content={
          <Input
            value={avatar}
            onChange={(e) => onChangeAvatar(e.target.value)}
            placeholder="URL do avatar"
          />
        }
      />
    </AvatarWrapper>
    <TextWrapper>
      <Input
        value={name}
        onChange={(e) => onChangeName(e.target.value)}
        placeholder="Nome"
        padding="10px"
        margin="0 10px 0"
      />
      {errors.name && (
        <Text
          as="p"
          fontSize="tiny"
          color="textSecondary"
          padding="5px 0"
          margin="0 10px"
        >
          {errors.name}
        </Text>
      )}
      <Hr />
      <Input
        value={email}
        onChange={(e) => onChangeEmail(e.target.value)}
        placeholder="Email"
        padding="10px"
        margin="0 10px 0"
      />
      {errors.email && (
        <Text
          as="p"
          fontSize="tiny"
          color="textSecondary"
          padding="5px 0"
          margin="0 10px"
        >
          {errors.email}
        </Text>
      )}
    </TextWrapper>
  </Container>
)

export default UserCardForm
