import { Children, cloneElement } from 'react'
import { SidebarBody, Item, Input, InnerItem } from './styles'

export const innerItems = Object.freeze({
  Input: ({ onChange }) => <Input {...{ onChange }}></Input>,
  InnerItem: ({ content }) => <InnerItem>{content}</InnerItem>,
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
            content = '',
          },
          index,
        ) =>
          visibility && (
            <Item {...{ className, onClick, key: index, href }}>
              {innerItem && innerItem({ onChange, content })}
            </Item>
          ),
      )}
      {Children.toArray(children).map((child) =>
        cloneElement(<Item>{child}</Item>),
      )}
    </SidebarBody>
  )
}
