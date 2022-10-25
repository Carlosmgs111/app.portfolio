import { useState, useEffect } from 'react'
import { getContext, CONTEXTS } from '../../contexts'
import axios from 'axios'
import { URL_API } from '../../services'
import { Project } from '../../containers/Project'
import { ProjectsSidebar } from '../../components/Sidebars/ProjectsSidebar'
import { labelCases } from '../../utils'
import { Container, MainContainer } from './styles'

export function Projects() {
  const [{ useStateValue }, ACTIONS] = getContext(CONTEXTS.Global)
  const [{ token, loading: globalLoading }, dispatch] = useStateValue()

  const [projects, setProjects] = useState([
    { name: 'Project 1', descriptions: [], images: [] },
    { name: 'Project 2', descriptions: [], images: [] },
    { name: 'Project 3', descriptions: [], images: [] },
    { name: 'Project 4', descriptions: [], images: [] },
  ])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [refs, setRefs] = useState([])
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

  const updateRefs = (ref, show) => {
    if (show && !refs.includes(ref)) refs.push(ref)
    if (!show && refs.includes(ref)) refs.splice(refs.indexOf(ref), 1)
    setRefs([...refs])
  }

  const struct = (projects) => {
    const projectContainers = []
    const indexes = []
    projects.map((project, index) => {
      projectContainers.push(
        <Project key={index} {...{ ...project, index, updateRefs }} />,
      )
      indexes.push(project.name)
    })

    return [projectContainers, indexes]
  }

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await axios.get(`${URL_API}/projects`)
        setProjects([...projects, ...data])
        console.log({ data })
      } catch (e) {
        setLoading(false)
        setError(e)
      }
    }
    fetchProjects()
    return ()=> {
      setProjects([])
      updateRefs([])
    }
  }, [token])

  const [projectContainers, indexes] = struct(projects)

  return (
    <Container>
      <ProjectsSidebar {...{ indexes, refs }} />
      <MainContainer>{projectContainers}</MainContainer>
    </Container>
  )
}
