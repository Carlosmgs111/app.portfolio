import { SidebarBody, Item, InnerItem } from './styles'
import { labelCases } from '../../../utils'
import { useSwitch } from '../../../hooks/useSwitch'
import { getContext, CONTEXTS } from '../../../contexts'
import { useEffect } from 'react'
import { manyfy } from '../../../utils'

export function PanelSidebar(props) {
  const [{ useStateValue }, ACTIONS] = getContext(CONTEXTS.Global)
  const [{ token, loading: globalLoading }, dispatch] = useStateValue()

  const [expand, switchExpand] = useSwitch(false, true)
  return (
    <SidebarBody {...{ ...props }}>
      <Item
        active={false}
        key="1"
        className={`fa-solid ${expand ? 'fa-xmark' : 'fa-bars'} sidebar-button`}
        onClick={switchExpand}
      />
      {token && <Item className="fa-solid fa-plus" />}
      {manyfy(<Item className="fa-solid fa-plus" />, 20)}
    </SidebarBody>
  )
}
