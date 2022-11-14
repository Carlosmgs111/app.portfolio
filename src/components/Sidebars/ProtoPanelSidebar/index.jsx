import { SidebarBody, Item, InnerItem } from './styles'
import { useSwitch } from '../../../hooks/useSwitch'
import { getContext, CONTEXTS } from '../../../contexts'

export function ProtoPanelSidebar(props) {
  const [{ useStateValue }, ACTIONS] = getContext(CONTEXTS.Global)
  const [{ token, loading: globalLoading }, dispatch] = useStateValue()

  const [expand, switchExpand] = useSwitch(false, true)
  return (
    <SidebarBody {...props}>
      <Item
        active={false}
        key="01"
        className={`fa-solid ${expand ? 'fa-xmark' : 'fa-bars'} sidebar-button`}
        onClick={switchExpand}
      />
      {token && <Item key="02" className="fa-solid fa-plus" />}
    </SidebarBody>
  )
}
