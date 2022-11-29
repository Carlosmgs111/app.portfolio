import { Children, cloneElement } from 'react'
import { SidebarBody, Item, Input } from './styles'

export const innerItems = Object.freeze({
  Input: ({ onChange }) => <Input {...{ onChange }}></Input>,
})

export function PanelSidebar(props) {
  const { children = [], items = [] } = props

  return (
    <SidebarBody {...props}>
      {items.map(
        (
          {
            innerItem = null,
            className,
            onClick = () => {},
            onChange = () => {},
            visibility = true,
            href = null,
          },
          index,
        ) =>
          visibility && (
            <Item {...{ className, onClick, key: index, href }}>
              {innerItem && innerItem({ onChange })}
            </Item>
          ),
      )}
      {Children.toArray(children).map((child) =>
        cloneElement(<Item>{child}</Item>),
      )}
    </SidebarBody>
  )
}
