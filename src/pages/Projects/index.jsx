import { useState, useEffect } from 'react'
import { getContext, CONTEXTS } from '../../contexts'
import axios from 'axios'
import { URL_API } from '../../services'
import { Project } from '../../containers/Project'
import { Container, MainContainer } from './styles'
import { useSidebar } from '../../hooks/useSidebar'

export function Projects() {
  const [{ useStateValue }, ACTIONS] = getContext(CONTEXTS.Global)
  const [{ token, loading: globalLoading }, dispatch] = useStateValue()

  const [projects, setProjects] = useState([
    { name: 'Project 1', descriptions: [], images: [] },
    { name: 'Project 2', descriptions: [], images: [] },
    { name: 'Project 3', descriptions: [], images: [] },
    { name: 'Project 4', descriptions: [], images: [] },
  ])

  const [ProjectsSidebar, setElements, updateRefs] = useSidebar(
    projects,
    'name',
  )
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

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await axios.get(`${URL_API}/projects`)
        setProjects([...projects, ...data])
        setElements([...projects, ...data])
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
      <ProjectsSidebar />
      <MainContainer>
        {projects.map((project, index) => (
          <Project key={index} {...{ ...project, index, updateRefs }} />
        ))}
      </MainContainer>
    </Container>
  )
}
