import {
  Title,
  ProjectContainer,
  Image,
  ImagesContainer,
  Description,
  DescriptionsContainer,
} from './styles'
import { useNearScreen } from '../../hooks/useNearScreen'
import { labelCases } from '../../utils'
import { useEffect } from 'react'

export const Project = ({ index, name, images, descriptions, updateRefs }) => {
  const [show, ref] = useNearScreen(false, updateRefs)
  useEffect(() => {}, [show, ref])
  return (
    <ProjectContainer ref={ref} id={labelCases(name).LS} even={index % 2 === 0}>
      <Title>{name}</Title>
      <ImagesContainer even={index % 2 === 0}>
        {images.map((image, index) => (
          <Image key={index} src={image} />
        ))}
      </ImagesContainer>
      <DescriptionsContainer even={index % 2 === 0}>
        {descriptions.map((description, index) => (
          <Description key={index}>{description}</Description>
        ))}
      </DescriptionsContainer>
    </ProjectContainer>
  )
}
