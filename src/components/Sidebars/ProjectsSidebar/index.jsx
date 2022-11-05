import { Sidebar, SidebarPanel, ItemList, Item, InnerItem } from './styles'
import { labelCases } from '../../../utils'
import { useSwitch } from '../../../hooks/useSwitch'
import { getContext, CONTEXTS } from '../../../contexts'
import {useEffect} from "react"

export const ProjectsSidebar = ({ indexes = [], refs }) => {
  const [{ useStateValue }, ACTIONS] = getContext(CONTEXTS.Global)
  const [{ token, loading: globalLoading }, dispatch] = useStateValue()

  const [expand, switchExpand] = useSwitch(false, true)

  useEffect(()=>{}, [])
  
  const indexesList = []

  indexes.map((name, index) => {
    const active = refs.includes(labelCases(name).LS)
    indexesList.push(
      <Item
        active={active}
        key={index}
        href={`#${labelCases(name).LS}`}
        className="fa-regular fa-circle-dot"
      >
        <InnerItem
          key={index}
          href={`#${labelCases(name).LS}`}
          {...{ show: expand }}
        >
          {name}
        </InnerItem>
      </Item>,
    )
  })

  return (
    <Sidebar>
      <SidebarPanel id="projects-sidebar-panel">
        <Item
          active={false}
          key="1"
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
        {indexesList}
      </ItemList>
    </Sidebar>
  )
}