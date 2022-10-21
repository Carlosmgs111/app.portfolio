import { useState, useEffect } from 'react'
import { getContext, CONTEXTS } from '../../contexts'
import { useSwitch } from '../../hooks/useSwitch'
import axios from 'axios'
import { URL_API } from '../../services'
import {
  Container,
  Title,
  ProjectContainer,
  Image,
  ImagesContainer,
  Description,
  DescriptionsContainer,
  MainContainer,
  Sidebar,
  SidebarPanel,
  ItemList,
  Item,
} from './styles'

export function Projects() {
  const [{ useStateValue }, ACTIONS] = getContext(CONTEXTS.Global)
  const [{ token, loading: globalLoading }, dispatch] = useStateValue()

  const [projects, setProjects] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [expand, switchExpand] = useSwitch(false, true)
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
  console.log({ expand })
  const populate = (projects) => {
    const projectContainers = []
    projects.map((project, index) =>
      projectContainers.push(
        <ProjectContainer even={index % 2 === 0}>
          <Title>{project.name}</Title>
          <ImagesContainer even={index % 2 === 0}>
            {project.images.map((image) => (
              <Image src={image} />
            ))}
          </ImagesContainer>
          <DescriptionsContainer even={index % 2 === 0}>
            {project.descriptions.map((description) => (
              <Description>{description}</Description>
            ))}
          </DescriptionsContainer>
        </ProjectContainer>,
      ),
    )

    return projectContainers
  }

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await axios.get(`${URL_API}/projects`)
        setProjects(data)
        console.log({ data })
      } catch (e) {
        setLoading(false)
        setError(e)
      }
    }
    fetchProjects()
  }, [token])

  return (
    <Container>
      <Sidebar>
        <SidebarPanel id="projects-sidebar-panel">
          <Item
            className={`fa-solid ${expand ? 'fa-xmark' : 'fa-bars'}`}
            onClick={switchExpand}
          />
          {token && <Item className="fa-solid fa-plus" />}
        </SidebarPanel>
        <ItemList
          {...{
            panelHeight: document.getElementById('projects-sidebar-panel')
              ?.clientHeight,
          }}
        >
          <Item className="fa-regular fa-circle">
            <Item className="inner" {...{ show: expand }}>
              Synapse
            </Item>
          </Item>
        </ItemList>
      </Sidebar>
      <MainContainer>{populate(projects)}</MainContainer>
    </Container>
  )
}
