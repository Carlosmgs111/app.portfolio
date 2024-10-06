import { labelCases, mapToList } from "../../utils";
import { useToggle } from "../../hooks/useToggle";
import styles from "./styles.module.css";
import { useMemo } from "react";

export function TrackSidebar(props: any) {
  const {
    items = {},
    innerItems = true,
    direction = "column",
    isactive = 1,
    expanded: _expanded = false,
    showbutton = 1,
    width = "available",
    redirect = "",
    icon = "fa-solid fa-circle-dot",
  }: any = props;
  const [expanded, switchExpand] = useToggle(
    showbutton ? _expanded : 1,
    !_expanded
  );

  const indexesList: any = useMemo(
    () =>
      mapToList(items).map((item: any, index: number) => {
        const { title, reference } = item;
        const href = redirect
          ? `/${redirect}#${labelCases(reference).LS}`
          : `#${labelCases(reference).LS}`;
        return (
          <a
            className={`
            ${styles.item} 
            ${expanded ? styles.expanded : ""}
            ${item.isVisible ? styles.active : ""}`}
            key={index}
            href={href}
          >
            <i
              className={`${icon} ${styles.icon} ${expanded && styles.hidden} ${
                item.isVisible ? styles.active : ""
              }`}
            ></i>
            {innerItems && (
              <i
                {...{
                  className: styles.inner.concat(
                    " ",
                    expanded ? styles.show : ""
                  ),
                }}
              >
                {labelCases(title).CS}
              </i>
            )}
          </a>
        );
      }),
    [mapToList(items)]
  );

  return (
    <section
      {...{
        ...props,
        style: { flexDirection: direction, width },
        className: styles.body.concat(" ", isactive && styles.active),
      }}
    >
      {innerItems && Boolean(showbutton) && (
        <div className={`${styles.header} ${expanded ? styles.expanded : ""}`}>
          <i
            key="0"
            className={`fa-solid 
            ${expanded ? "fa-ellipsis-vertical" : "fa-bars"}
            ${styles.item}`}
            onClick={switchExpand}
          />
        </div>
      )}
      {indexesList}
    </section>
  );
}
