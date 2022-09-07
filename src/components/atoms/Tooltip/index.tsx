import { useState } from 'react'
import {
  Container,
  IContainer,
  TooltipWrapper,
  ITooltipWrapper,
  TargetWrapper,
} from './styles'

interface ITooltip extends IContainer, ITooltipWrapper {
  content: React.ReactNode | string
  target: React.ReactNode
}

const Tooltip: React.FC<ITooltip> = ({
  target,
  content,
  direction,
  ...props
}) => {
  const [isActive, setIsActive] = useState(false)

  return (
    <Container {...props}>
      <TargetWrapper onClick={() => setIsActive((prev) => !prev)}>
        {target}
      </TargetWrapper>
      <TooltipWrapper
        direction={direction}
        className={isActive ? 'active' : ''}
        onBlur={() => setIsActive(false)}
      >
        {content}
      </TooltipWrapper>
    </Container>
  )
}

export default Tooltip
