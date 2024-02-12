import { Children, cloneElement } from "react";
import styles from "./styles.module.css";

export const innerItems = Object.freeze({
  Input: ({ onChange, expanded }) => (
    <input {...{ onChange, expanded, className: styles.input }}></input>
  ),
  InnerItem: ({ content, expanded }) => (
    <i
      {...{
        className: styles.inner.concat(" ", expanded ? styles.expanded : ""),
        content,
      }}
    >
      {content}
    </i>
  ),
  InnerMenu: () => {},
  Separator: () => <i className={styles.separator} />,
});

export function PanelSidebar(props) {
  const { children = [], items = [], expanded = false, active = true } = props;

  return (
    <div className={`${styles.body} ${active ? styles.active : ""}`}>
      {items.map(
        (
          {
            innerItem = null,
            className = "",
            onClick = () => {},
            onChange = () => {},
            visibility = true,
            href = null,
            content = "",
          },
          index
        ) =>
          visibility && (
            <i
              {...{
                className: className.concat(" ", styles.item),
                onClick,
                key: index,
                href,
              }}
            >
              {innerItem && innerItem({ onChange, content, expanded })}
            </i>
          )
      )}
      {Children.toArray(children).map((child) => cloneElement(<i>{child}</i>))}
    </div>
  );
}
