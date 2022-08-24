import NextImage from 'next/image'
import { Container, IContainer } from './styles'

interface ImageProps extends IContainer {
  src: string
  alt: string
}

const Image: React.FC<ImageProps> = ({
  src,
  alt,
  width = '100px',
  height = '100px',
  ...props
}) => (
  <Container {...props} width={width} height={height}>
    <NextImage
      loader={() => src}
      unoptimized
      {...{ src, alt, width, height }}
    />
  </Container>
)

export default Image
