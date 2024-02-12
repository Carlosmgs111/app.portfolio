import { useEffect } from "react";
import { labelCases } from "../../../utils";
import { useToggle } from "../../../hooks/useToggle";
import { getContext, CONTEXTS } from "../../../contexts";
import { manyfy } from "../../../utils";
import styles from "./styles.module.css";

export function TrackSidebar(props) {
  const {
    items = [],
    refs = [],
    innerItems = true,
    direction = "column",
  } = props;
  const [{ useStateValue }, ACTIONS] = getContext(CONTEXTS.Global);
  const [{ token, loading: globalLoading }, dispatch] = useStateValue();

  const [expand, switchExpand] = useToggle(false, true);

  useEffect(() => {}, []);

  const indexesList = [];

  items.map((name, index) => {
    const active = refs.includes(labelCases(name).LS);
    indexesList.push(
      <a
        active={active}
        key={index}
        href={`#${labelCases(name).LS}`}
        className={`fa-regular fa-circle-dot ${styles.item.concat(
          " ",
          active ? styles.active : ""
        )}`}
      >
        {innerItems && (
          <i
            {...{
              className: styles.inner.concat(" ", expand ? styles.show : ""),
            }}
          >
            {name}
          </i>
        )}
      </a>
    );
  });

  return (
    <section
      {...{
        style: { flexDirection: direction },
        className: styles.body.concat(" ", styles.active),
      }}
    >
      {innerItems && (
        <i
          key="0"
          className={`fa-solid ${
            expand ? "fa-xmark" : "fa-bars"
          } sidebar-button ${styles.item}`}
          onClick={switchExpand}
        />
      )}
      {indexesList}
    </section>
  );
}
