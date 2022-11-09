import { Sidebar } from './styles'
import { useSwitch } from '../../../hooks/useSwitch'
import { getContext, CONTEXTS } from '../../../contexts'
import { useEffect } from 'react'

import { TrackSidebar } from '../TrackSidebar'
import { PanelSidebar } from '../PanelSidebar'

export const MultiSidebar = (props) => {
  const [{ useStateValue }, ACTIONS] = getContext(CONTEXTS.Global)
  const [{ token, loading: globalLoading }, dispatch] = useStateValue()

  const [expand, switchExpand] = useSwitch(false, true)

  useEffect(() => {}, [])

  return (
    <Sidebar>
      <TrackSidebar {...props}/>
      <PanelSidebar/>
    </Sidebar>
  )
}
