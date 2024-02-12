import { Item, Link, Banner } from "./styles";
import styles from "./styles.module.css";
import { Children, cloneElement, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useToggle } from "../../hooks/useToggle";
import { runRequest } from "../../services/runRequest";
import { getContext, CONTEXTS } from "../../contexts";

export default function Navigation({ children, banner, className }) {
  const location = useLocation();
  const [{ useStateValue }, ACTIONS] = getContext(CONTEXTS.Global);
  const [{ searchedUsername }, dispatch] = useStateValue();

  const [menu, switchMenu] = useToggle(
    { show: false, name: "fas fa-bars p-2 item" },
    { show: true, name: "fas fa-times p-2 item" }
  );
  const [current, setCurrent] = useState(null);
  const [showfixed, setShowFixed] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [indexedElements, setIndexedElements] = useState([]);
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    runRequest({
      setData: (data) => setIndexedElements([...indexedElements, ...data]),
    }).get("users/username/all");
    const searchInput = document.getElementsByName("search-input")[0];
    searchInput.addEventListener("focusin", () => setSelected(true));
    searchInput.addEventListener("focusout", () => setSelected(false));
  }, [showfixed]);

  const onClick = (e) => {
    setCurrent(Number(e.target.id));
    if (menu.show) switchMenu();
    console.log({ target: e.target.id });
  };

  const childrens = Children.toArray(children);

  return (
    <div className={`${className} ${styles.container}`}>
      <div
        className={styles.navbar_header}
        style={{
          justifyContent: "space-between",
          display: "flex",
          flexDirection: "row",
        }}
      >
        {banner && (
          <Banner
            onClick={() => {
              if (menu.show) switchMenu();
              setCurrent(null);
            }}
            to={banner.to}
          >
            {banner.title}
          </Banner>
        )}
      </div>
      <form action="">
        <input
          className={styles.search_input}
          type="search"
          name="search-input"
          value={searchValue}
          list="indexed_elements"
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
        />
        <i
          className={`fa-solid fa-magnifying-glass ${styles.search_icon} ${
            selected ? styles.selected : ""
          }`}
        />
        <input
          type="submit"
          className={styles.submit_search}
          onClick={(e) => {
            dispatch({
              type: ACTIONS.setSearchedUsername,
              payload: searchValue,
            });
            setSearchValue("");
            e.preventDefault();
          }}
        />
      </form>
      <datalist id="indexed_elements">
        {indexedElements.map((iE, idx) => (
          <option value={iE} key={idx} />
        ))}
      </datalist>
      <nav className={styles.navbar.concat(" ", className)}>
        <i
          className={`${menu.name} ${styles.button}`}
          id="nav-button"
          onClick={switchMenu}
        ></i>
        <ul
          className={`${className} ${styles.itemlist.concat(
            " ",
            menu.show ? styles.show : ""
          )} navigation-list`}
        >
          {children
            ? childrens.map((child, index) => {
                var LinkedItem = child.props.children.props?.link ? Item : Link;
                return (
                  <LinkedItem
                    className={`${child.props.className || ""}`}
                    selected={
                      location.pathname
                        ? child.props.to === location.pathname
                        : current === child.props.id ||
                          current === String(index)
                    }
                    type="button"
                    onClick={(e) => {
                      const next = e.target.id || child.props.id;
                      if (next) setCurrent(next);
                      if (child.props.onClick) child.props.onClick(e);
                      if (menu.show) switchMenu();
                    }}
                    key={index}
                    to={child.props?.to || ""}
                    id={child.props?.id || index}
                  >
                    {cloneElement(
                      child,
                      {
                        ...child.props,
                        id: child.props?.id || index,
                      } || {}
                    )}
                  </LinkedItem>
                );
              })
            : null}
        </ul>
      </nav>
      {/* <div style={{ width: "100%", height: "50px" }}></div> */}
    </div>
  );
}
