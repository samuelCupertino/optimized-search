import { useState } from 'react'
import NextImage from 'next/image'
import { Container, IContainer } from './styles'

interface ImageProps extends IContainer {
  src: string
  alt: string
  fallbackSrc?: string
}

const Image: React.FC<ImageProps> = ({
  src,
  alt,
  fallbackSrc = '/images/image-fallback.jpeg',
  width = '100px',
  height = '100px',
  ...props
}) => {
  const [imageSrc, setImageSrc] = useState(src)
  return (
    <Container {...props} width={width} height={height}>
      <NextImage
        {...{ src: imageSrc, alt, width, height }}
        unoptimized
        onError={() => setImageSrc(fallbackSrc)}
      />
    </Container>
  )
}

export default Image
