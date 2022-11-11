import { SidebarBody, Item, Input } from './styles'
import { DefineSchema } from '../../../components/DefineSchema'
import { getContext, CONTEXTS } from '../../../contexts'

export function PanelSidebar2(props) {
  const [{ useStateValue }, ACTIONS] = getContext(CONTEXTS.Global)
  const [{ token, loading: globalLoading }, dispatch] = useStateValue()

  const { setCurrentModal } = props

  return (
    <SidebarBody {...props}>
      <Item id="0" className="fa-solid fa-magnifying-glass">
        <Input></Input>
      </Item>
      {token && (
        <Item id="1" href="#dashboard" className="fa-solid fa-plus"></Item>
      )}
      <Item id="2" className="fa-solid fa-eye">
        <Input></Input>
      </Item>
      <Item
        id="3"
        className="fa-solid fa-fingerprint"
        onClick={setCurrentModal}
      ></Item>
    </SidebarBody>
  )
}
