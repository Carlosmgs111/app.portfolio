import { Sidebar, Body, Header, Footer, Item } from './styles'
import { useSwitch } from '../../../hooks/useSwitch'
import { getContext, CONTEXTS } from '../../../contexts'
import { useEffect, useState } from 'react'
import { injectAttrsToReactElements } from '../../../utils'

export const MultiSidebar = (props) => {
  const { sidebars } = props
  const [{ useStateValue }, ACTIONS] = getContext(CONTEXTS.Global)
  const [{ token, loading: globalLoading }, dispatch] = useStateValue()
  const [expand, switchExpand] = useSwitch(false, true)
  const [activeSidebars, setActiveSidebars] = useState([sidebars[0]?.props.id])

  useEffect(() => {}, [])

  return (
    <Sidebar>
      <Header>
        {sidebars.map((sidebar, index) => (
          <Item
            key={index}
            onClick={() => setActiveSidebars([sidebar.props.id])}
            active={activeSidebars.includes(sidebar.props.id)}
          >
            {index + 1}
          </Item>
        ))}
        {activeSidebars.length !== sidebars.length && (
          <Item
            className="fa-solid fa-ellipsis"
            onClick={() =>
              setActiveSidebars([
                ...sidebars.map((sidebar) => sidebar.props.id),
              ])
            }
          />
        )}
      </Header>
      <Body>
        {sidebars.map((sidebar, index) =>
          injectAttrsToReactElements(
            [
              ...injectAttrsToReactElements(
                [sidebar],
                'active',
                activeSidebars.includes(sidebar.props.id),
              ),
            ],
            'key',
            index,
          ),
        )}
      </Body>
      <Footer>
        <Item className="fa-solid fa-gear rotable"></Item>
      </Footer>
    </Sidebar>
  )
}
