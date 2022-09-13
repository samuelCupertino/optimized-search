import { useState } from 'react'
import NextImage from 'next/image'
import { Container, IContainer } from './styles'

interface ImageProps extends IContainer {
  src: string
  alt: string
  fallbackSrc?: string
  loading?: boolean
}

const Image: React.FC<ImageProps> = ({
  src,
  alt,
  fallbackSrc = '/images/image-fallback.jpeg',
  loading = false,
  width = '100px',
  height = '100px',
  ...props
}) => {
  const [imageSrc, setImageSrc] = useState(src)
  return (
    <Container
      {...props}
      width={width}
      height={height}
      className={loading ? 'anim-loading' : ''}
    >
      <NextImage
        src={imageSrc}
        alt={alt}
        width={width}
        height={height}
        unoptimized={true}
        loader={() => imageSrc}
        onError={() => setImageSrc(fallbackSrc)}
      />
    </Container>
  )
}

export default Image
