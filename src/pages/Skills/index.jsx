import { Container, Main } from './styles'
import { Skill } from '../../containers/Skill'
import { MultiSidebar } from '../../components/Sidebars/MultiSidebar'
import { PanelSidebar } from '../../components/Sidebars/PanelSidebar'
import { useTrackSidebar } from '../../hooks/useTrackSidebar'
import { getContext, CONTEXTS } from '../../contexts'
import { useEffect } from 'react'

export function Skills() {
  const [{ useStateValue }, ACTIONS] = getContext(CONTEXTS.Global)
  const [{ token, loading: globalLoading }, dispatch] = useStateValue()
  const [TrackSidebar, setElements, updateRefs] = useTrackSidebar()

  const skills = [
    {
      title: 'Hexagonal Architecture',
      image:
        'https://herbertograca.files.wordpress.com/2018/11/100-explicit-architecture-svg.png',
      description: 'Desarrollo de proyectos backend con arquitectura Hexagonal',
    },
    {
      title: 'Clean Architecture',
      image:
        'https://velog.velcdn.com/images%2Fitssweetrain%2Fpost%2F4aa1d07d-9e43-4316-80ef-109c0e090111%2Fimage.png',
      description: 'Desarrollo de proyectos backend con arquitectura Limpia',
    },
    {
      title: 'Desarrollo con styled components',
      image: 'https://styled-components.com/atom.png',
      description: 'Desarrollo de componentes con styled components',
    },
  ]

  const populate = (skill, index) => {
    return <Skill {...{ ...skill, index, updateRefs }} />
  }

  useEffect(() => {
    setElements([...skills.map((skill) => skill.title)])
  }, [token])

  const sidebars = [TrackSidebar, <PanelSidebar />]
  return (
    <Container>
      <MultiSidebar {...{ sidebars }} />
      <Main>
        <h1>Skills</h1>
        {skills.map(populate)}
      </Main>
    </Container>
  )
}
