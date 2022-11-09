import { Sidebar, Body, Header, Footer, Item } from './styles'
import { useSwitch } from '../../../hooks/useSwitch'
import { getContext, CONTEXTS } from '../../../contexts'
import { useEffect, useState } from 'react'

import { TrackSidebar } from '../TrackSidebar'
import { PanelSidebar } from '../PanelSidebar'

export const MultiSidebar = (props) => {
  const [{ useStateValue }, ACTIONS] = getContext(CONTEXTS.Global)
  const [{ token, loading: globalLoading }, dispatch] = useStateValue()
  const [expand, switchExpand] = useSwitch(false, true)
  const [currentSidebar, setCurrentSidebar] = useState('track-sidebar')
  const [allActive, switchAllActive] = useSwitch(null, true)

  console.log({ currentSidebar })
  useEffect(() => {}, [])

  return (
    <Sidebar>
      <Header>
        <Item
          href="#"
          onClick={() => setCurrentSidebar('track-sidebar')}
          active={allActive || currentSidebar === 'track-sidebar'}
        >
          1
        </Item>
        <Item
          href="#"
          onClick={() => setCurrentSidebar('panel-sidebar')}
          active={allActive || currentSidebar === 'panel-sidebar'}
        >
          2
        </Item>
        <Item
          href="#"
          onClick={() => setCurrentSidebar('track-sidebar2')}
          active={allActive || currentSidebar === 'track-sidebar2'}
        >
          3
        </Item>
        <Item href="#" onClick={switchAllActive} active={allActive}>
          All
        </Item>
      </Header>
      <Body {...{ direction: allActive ? 'row' : 'column' }}>
        <TrackSidebar
          {...{
            ...props,
            id: 'track-sidebar',
            active: allActive || currentSidebar === 'track-sidebar',
          }}
        />
        <PanelSidebar
          {...{
            ...props,
            id: 'panel-sidebar',
            active: allActive || currentSidebar === 'panel-sidebar',
          }}
        />
        <TrackSidebar
          {...{
            ...props,
            id: 'track-sidebar2',
            active: allActive || currentSidebar === 'track-sidebar2',
          }}
        />
      </Body>
      <Footer>
        <Item className="fa-solid fa-gear rotable"></Item>
      </Footer>
    </Sidebar>
  )
}
