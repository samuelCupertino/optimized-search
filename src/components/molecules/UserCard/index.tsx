import { Image, Text, Hr } from '@/src/components/atoms'
import { Container, IContainer, AvatarWrapper, TextWrapper } from './styles'

export interface IUserCardProps extends IContainer {
  id?: string
  name: string
  email?: string
  avatar: string
  highlight?: string
  loading?: ('id' | 'avatar' | 'name' | 'email')[] | boolean
  hidden?: ('id' | 'email')[]
}

const UserCard: React.FC<IUserCardProps> = ({
  id,
  avatar,
  name,
  email,
  highlight,
  loading = false,
  hidden = [],
  ...props
}) => {
  const loadingFields =
    typeof loading === 'object'
      ? loading
      : loading
      ? ['id', 'avatar', 'name', 'email']
      : []

  return (
    <Container {...props}>
      <AvatarWrapper>
        <Image
          src={avatar}
          alt={`foto de ${name}`}
          border="3px solid"
          borderRadius="50%"
          bgColor="bgPrimary"
          loading={loadingFields.includes('avatar')}
        />
      </AvatarWrapper>

      <TextWrapper>
        <Text
          as="h2"
          fontSize="medium"
          padding="5px"
          margin="0 10px 0 0"
          highlight={highlight}
          loading={loadingFields.includes('name')}
        >
          {name}
        </Text>
        <Hr />
        {!hidden.includes('email') && (
          <Text
            as="p"
            padding="5px"
            margin="0 10px 0 0"
            wordBreak="break-word"
            loading={loadingFields.includes('email')}
          >
            {email}
          </Text>
        )}
        {!hidden.includes('id') && (
          <Text
            as="p"
            fontSize="tiny"
            color="textSecondary"
            padding="5px 0"
            margin="4px 10px 0 auto"
            loading={loadingFields.includes('id')}
          >
            ID: {id}
          </Text>
        )}
      </TextWrapper>
    </Container>
  )
}

export default UserCard
