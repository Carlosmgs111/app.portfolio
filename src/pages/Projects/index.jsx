import { useState, useEffect } from 'react'
import { getContextValue, CONTEXTS } from '../../contexts'
import axios from 'axios'
import { URL_API } from '../../services'
import { Project } from '../../containers/Project'
import { Container, MainContainer } from './styles'
import { useTrackSidebar } from '../../hooks/useTrackSidebar'
import { MultiSidebar } from '../../components/Sidebars/MultiSidebar'
import { PanelSidebar } from '../../components/Sidebars/PanelSidebar'

export function Projects() {
  const { token } = getContextValue(CONTEXTS.Global)
  const [projects, setProjects] = useState([])
  const [TrackSidebar, setElements, updateRefs] = useTrackSidebar()
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [projectSchema, setProjectSchema] = useState({
    name: '',
    emitedBy: '',
    // ? `{` symbol used for mark a select object controller
    'emitedBy{': [],
    emitedAt: new Date().getTime(),
    // ? `~` symbol used for mark a date object controller
    'emitedAt~': new Date().toISOString().slice(0, 10),
    image: '',
    url: '',
  })

  const sidebars = [
    TrackSidebar, // ? ⬅️ this is a rendered component, so we just put as a variable and it is not called
  ]

  if (token)
    sidebars.push(
      <PanelSidebar
        {...{
          id: 'panel-sidebar',
        }}
      />,
    )

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await axios.get(`${URL_API}/projects`)
        setProjects([...data])
        setElements([
          ...data.map((project) => project.name),
        ])
        console.log({ data })
      } catch (e) {
        setLoading(false)
        setError(e)
      }
    }
    fetchProjects()
    return () => {
      setProjects([])
      updateRefs([])
    }
  }, [token])

  return (
    <Container>
      {
        <MultiSidebar
          {...{
            sidebars,
          }}
        />
      }
      <MainContainer>
        {projects.map((project, index) => (
          <Project
            key={index}
            {...{ ...project, even: index % 2 === 0, updateRefs }}
          />
        ))}
      </MainContainer>
    </Container>
  )
}
