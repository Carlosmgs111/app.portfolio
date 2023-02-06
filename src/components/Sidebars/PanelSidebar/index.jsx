import { Children, cloneElement } from "react";
import { SidebarBody, Item, Input, InnerItem, Separator } from "./styles";



export const innerItems = Object.freeze({
  Input: ({ onChange, expanded }) => (
    <Input {...{ onChange, expanded }}></Input>
  ),
  InnerItem: ({ content, expanded }) => (
    <InnerItem {...{ expanded }}>{content}</InnerItem>
  ),
  InnerMenu: () => {},
  Separator: () => <Separator />,
});

export function PanelSidebar(props) {
  const { children = [], items = [], expanded = false } = props;

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
            content = "",
          },
          index
        ) =>
          visibility && (
            <Item {...{ className, onClick, key: index, href }}>
              {innerItem && innerItem({ onChange, content, expanded })}
            </Item>
          )
      )}
      {Children.toArray(children).map((child) =>
        cloneElement(<Item>{child}</Item>)
      )}
    </SidebarBody>
  );
}
