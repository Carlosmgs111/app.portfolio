import { useEffect } from 'react'
import { SidebarBody, Item, InnerItem } from './styles'
import { labelCases } from '../../../utils'
import { useToggle } from '../../../hooks/useToggle'
import { getContext, CONTEXTS } from '../../../contexts'
import { manyfy } from '../../../utils'

export function TrackSidebar(props) {
  const { items = [], refs = [], innerItems = true } = props
  const [{ useStateValue }, ACTIONS] = getContext(CONTEXTS.Global)
  const [{ token, loading: globalLoading }, dispatch] = useStateValue()

  const [expand, switchExpand] = useToggle(false, true)

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
        {innerItems && <InnerItem {...{ show: expand }}>{name}</InnerItem>}
      </Item>,
    )
  })

  return (
    <SidebarBody {...props}>
      {innerItems && (
        <Item
          active={false}
          key="0"
          // href="#"
          className={`fa-solid ${
            expand ? 'fa-xmark' : 'fa-bars'
          } sidebar-button`}
          onClick={switchExpand}
        />
      )}
      {indexesList}
    </SidebarBody>
  )
}
