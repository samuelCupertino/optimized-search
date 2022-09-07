import { Image, Hr, Tooltip, Input } from '@/src/components/atoms'
import { Container, IContainer, AvatarWrapper, TextWrapper } from './styles'

export interface IFormUserCardProps extends IContainer {
  name: string
  email: string
  avatar: string
  onChangeName: (value?: string) => void
  onChangeEmail: (value?: string) => void
  onChangeAvatar: (value?: string) => void
}

const FormUserCard: React.FC<IFormUserCardProps> = ({
  avatar,
  name,
  email,
  onChangeName,
  onChangeEmail,
  onChangeAvatar,
  ...props
}) => (
  <Container {...props}>
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
      <Hr />
      <Input
        value={email}
        onChange={(e) => onChangeEmail(e.target.value)}
        placeholder="Email"
        padding="10px"
        margin="0 10px 0"
      />
    </TextWrapper>
  </Container>
)

export default FormUserCard
