import { Image, Text, Hr } from '@/src/components/atoms'
import { Container, IContainer, AvatarWrapper, TextWrapper } from './styles'

export interface IUserCardProps extends IContainer {
  name: string
  email: string
  avatar: string
  highlight?: string
}

const UserCard: React.FC<IUserCardProps> = ({
  avatar,
  name,
  email,
  highlight,
  ...props
}) => (
  <Container {...props}>
    <AvatarWrapper>
      <Image
        src={avatar}
        alt={`foto de ${name}`}
        border="3px solid"
        borderRadius="50%"
      />
    </AvatarWrapper>
    <TextWrapper>
      <Text
        as="h2"
        fontSize="medium"
        padding="10px"
        margin="0 10px 0 0"
        highlight={highlight}
      >
        {name}
      </Text>
      <Hr />
      <Text as="p" padding="10px" margin="0 10px 0 0" wordBreak="break-word">
        {email}
      </Text>
    </TextWrapper>
  </Container>
)

export default UserCard
