import { Image, Text, Hr } from '@/src/components/atoms'
import {
  Container,
  IContainer,
  AvatarWrapper,
  CurvatureDetail,
  TextWrapper,
} from './styles'

export interface IUserCardProps extends IContainer {
  id: string
  name: string
  email: string
  avatar: string
  highlight?: string
  loading?: ('id' | 'avatar' | 'name' | 'email')[] | boolean
  onClick?: () => void
}

export const UserCard: React.FC<IUserCardProps> = ({
  id,
  avatar,
  name,
  email,
  highlight,
  loading = false,
  colorPrimary = 'bgPrimary',
  onClick,
  ...props
}) => {
  const loadingFields =
    typeof loading === 'object'
      ? loading
      : loading
      ? ['id', 'avatar', 'name', 'email']
      : []

  return (
    <Container {...props} colorPrimary={colorPrimary} onClick={onClick}>
      <AvatarWrapper colorPrimary={colorPrimary}>
        <CurvatureDetail colorPrimary={colorPrimary} />
        <Image
          src={avatar || '/images/profile.png'}
          alt={`foto de ${name}`}
          fallbackSrc="/images/profile.png"
          border="3px solid"
          borderRadius="50%"
          color={colorPrimary}
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
        <Hr color={colorPrimary} />
        <Text
          as="p"
          padding="5px"
          margin="0 10px 0 0"
          wordBreak="break-word"
          loading={loadingFields.includes('email')}
        >
          {email}
        </Text>
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
      </TextWrapper>
    </Container>
  )
}
