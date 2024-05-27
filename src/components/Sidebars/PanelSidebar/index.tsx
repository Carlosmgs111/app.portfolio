import { Children, cloneElement } from "react";
import styles from "./styles.module.css";

export const innerItems = Object.freeze({
  Input: ({ onChange, expanded }: any) => (
    <input {...{ onChange, expanded, className: styles.input }}></input>
  ),
  InnerItem: ({ content, expanded }: any) => (
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

export function PanelSidebar(props: any) {
  const {
    children = [],
    items = [],
    expanded = true,
    isactive = 1,
    width,
  } = props;

  return (
    <div
      style={{ width: width || "available" }}
      className={`${styles.body} ${isactive ? styles.active : ""}`}
    >
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
          }: any,
          index: number
        ) =>
          visibility && (
            <i
              key={index}
              {...{
                className: className.concat(" ", styles.item),
                onClick,
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
