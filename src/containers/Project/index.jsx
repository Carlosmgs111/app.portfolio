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

export const Project = ({ even, name, images, descriptions, updateRefs }) => {
  const [show, ref] = useNearScreen(false, updateRefs)
  useEffect(() => {}, [show, ref])
  return (
    <ProjectContainer ref={ref} id={labelCases(name).LS} even={even}>
      <Title>{name}</Title>
      <ImagesContainer even={even}>
        {images.map((image, index) => (
          <Image key={index} src={image} />
        ))}
      </ImagesContainer>
      <DescriptionsContainer even={even}>
        {descriptions.map((description, index) => (
          <Description key={index}>{description}</Description>
        ))}
      </DescriptionsContainer>
    </ProjectContainer>
  )
}
