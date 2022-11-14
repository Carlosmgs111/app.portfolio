import { Container, InnerContainer, Title, Image } from './styles'
import { useNearScreen } from '../../hooks/useNearScreen'
import { labelCases } from '../../utils'
import { useEffect } from 'react'

export function Skill({ index, title, image, description, updateRefs }) {
  const [show, ref] = useNearScreen(false, updateRefs)
  useEffect(() => {}, [show, ref])
  return (
    <div ref={ref} id={labelCases(title).LS}>
      <Title>{title}</Title>
      <Container reverse={index % 2 === 0}>
        <InnerContainer className="image">
          <Image src={image} />
        </InnerContainer>
        <InnerContainer className="description">{description}</InnerContainer>
      </Container>
    </div>
  )
}
