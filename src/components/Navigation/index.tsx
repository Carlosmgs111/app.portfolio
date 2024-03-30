import { Item, Link } from "./styles";
import { Link as LinkRouter } from "react-router-dom";
import styles from "./styles.module.css";
import { Children, cloneElement, useState } from "react";
import { useLocation } from "react-router-dom";
import { useToggle } from "../../hooks/useToggle";
import { LogoSVG } from "./../../icons";
import { useStateValue } from "../../contexts/context";
import { actionTypes } from "../../";

export default function Navigation({ children, banner, className }: any) {
  const location = useLocation();
  const [, dispatch] = useStateValue();
  const [menu, switchMenu] = useToggle(
    { show: false, name: "fas fa-bars p-2 item" },
    { show: true, name: "fas fa-times p-2 item" }
  );
  const [current, setCurrent]: any = useState(null);
  const childrens = Children.toArray(children);

  return (
    <div style={{ position: "relative" }}>
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
            <LinkRouter
              onClick={() => {
                if (menu.show) switchMenu();
                setCurrent(null);
              }}
              to={banner.to}
            >
              <LogoSVG></LogoSVG>
            </LinkRouter>
          )}
        </div>
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
              ? childrens.map((child: any, index: any) => {
                  var LinkedItem = child.props.children.props?.link
                    ? Item
                    : Link;
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
                      onClick={(e: any) => {
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
      <div className={styles.page_settings}>
        <select
          onChange={(e) =>
            dispatch({
              type: actionTypes.setCurrentLang,
              payload: e.target.value,
            })
          }
          className={styles.languages}
        >
          <option value="es">ES</option>
          <option value="en">EN</option>
        </select>
      </div>
    </div>
  );
}
