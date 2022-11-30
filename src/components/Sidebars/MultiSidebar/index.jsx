import { FloatContainer, Sidebar, Body, Header, Footer, Item } from './styles'
import { useSwitch } from '../../../hooks/useSwitch'
import { getContextValue, CONTEXTS } from '../../../contexts'
import { useEffect, useState } from 'react'
import { injectAttrsToReactElements } from '../../../utils'

export const MultiSidebar = (props) => {
  const { sidebars = [], float = true } = props
  const [expand, switchExpand] = useSwitch(false, true)
  const [activeSidebars, setActiveSidebars] = useState([sidebars[0]?.props.id])

  useEffect(() => {
    // setActiveSidebars([...activeSidebars, sidebars[1]?.props.id])
  }, [])

  const main = (
    <Sidebar>
      {sidebars.length > 1 && (
        <Header>
          {sidebars.map((sidebar, index) => (
            <Item
              key={index}
              // href="#"
              onClick={() => setActiveSidebars([sidebar.props.id])}
              active={activeSidebars.includes(sidebar.props.id)}
            >
              {index + 1}
            </Item>
          ))}
          {activeSidebars.length !== sidebars.length && (
            <Item
              // href="#"
              key="expand-button"
              className="fa-solid fa-ellipsis"
              onClick={() =>
                setActiveSidebars([
                  ...sidebars.map((sidebar) => sidebar.props.id),
                ])
              }
            />
          )}
        </Header>
      )}
      <Body {...{ active: activeSidebars.length > 1 }}>
        {sidebars.map((sidebar, index) =>
          injectAttrsToReactElements([sidebar], {
            active: activeSidebars.includes(sidebar.props.id),
            key: index,
          }),
        )}
      </Body>
      <Footer>
        <Item key="settings-button" className="fa-solid fa-gear rotable"></Item>
      </Footer>
    </Sidebar>
  )

  return float ? <FloatContainer>{main}</FloatContainer> : main
}
