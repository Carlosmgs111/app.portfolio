import { useEffect } from 'react'
import { SidebarBody, Item, InnerItem } from './styles'
import { labelCases } from '../../../utils'
import { useSwitch } from '../../../hooks/useSwitch'
import { getContext, CONTEXTS } from '../../../contexts'
import { manyfy } from '../../../utils'

export function TrackSidebar(props) {
  const { items = [], refs = [] } = props
  const [{ useStateValue }, ACTIONS] = getContext(CONTEXTS.Global)
  const [{ token, loading: globalLoading }, dispatch] = useStateValue()

  const [expand, switchExpand] = useSwitch(false, true)

  useEffect(() => {}, [])

  const indexesList = []

  items.map((name, index) => {
    const active = refs.includes(labelCases(name).LS)
    indexesList.push(
      <Item
        active={active}
        key={index}
        href={`#${labelCases(name).LS}`}
        className="fa-regular fa-circle-dot"
      >
        <InnerItem {...{ show: expand }}>{name}</InnerItem>
      </Item>,
    )
  })

  return (
    <SidebarBody {...props}>
      <Item
        active={false}
        key="0"
        // href="#"
        className={`fa-solid ${expand ? 'fa-xmark' : 'fa-bars'} sidebar-button`}
        onClick={switchExpand}
      />
      {indexesList}
    </SidebarBody>
  )
}
