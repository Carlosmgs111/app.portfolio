import { Sidebar, Body, Header, Footer, Item } from './styles'
import { useSwitch } from '../../../hooks/useSwitch'
import { getContext, CONTEXTS } from '../../../contexts'
import { useEffect, useState } from 'react'
import { injectAttrsToReactElements } from '../../../utils'

import { TrackSidebar } from '../TrackSidebar'
import { PanelSidebar } from '../PanelSidebar'

export const MultiSidebar = (props) => {
  const sidebars = [
    <TrackSidebar
      {...{
        ...props,
        id: 'track-sidebar',
      }}
    />,
    <PanelSidebar
      {...{
        ...props,
        id: 'panel-sidebar',
      }}
    />,
    <TrackSidebar
      {...{
        ...props,
        id: 'track-sidebar2',
      }}
    />,
  ]
  const [{ useStateValue }, ACTIONS] = getContext(CONTEXTS.Global)
  const [{ token, loading: globalLoading }, dispatch] = useStateValue()
  const [expand, switchExpand] = useSwitch(false, true)
  const [activeSidebars, setActiveSidebars] = useState([sidebars[0].props.id])

  useEffect(() => {}, [])

  return (
    <Sidebar>
      <Header>
        {sidebars.map((sidebar, index) => (
          <Item
            onClick={() => setActiveSidebars([sidebar.props.id])}
            active={activeSidebars.includes(sidebar.props.id)}
          >
            {index + 1}
          </Item>
        ))}
        {activeSidebars.length !== sidebars.length && (
          <Item
            onClick={() =>
              setActiveSidebars([
                ...sidebars.map((sidebar) => sidebar.props.id),
              ])
            }
            active={activeSidebars.length === sidebars.length}
          >
            All
          </Item>
        )}
      </Header>
      <Body>
        {sidebars.map((sidebar) =>
          injectAttrsToReactElements(
            [sidebar],
            'active',
            activeSidebars.includes(sidebar.props.id),
          ),
        )}
      </Body>
      <Footer>
        <Item className="fa-solid fa-gear rotable"></Item>
      </Footer>
    </Sidebar>
  )
}
