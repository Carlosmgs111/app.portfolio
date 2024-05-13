import { Link as LinkRouter } from "react-router-dom";
import styles from "./styles.module.css";
import { useLocation } from "react-router-dom";
import { useToggle } from "../../hooks/useToggle";
import { LogoSVG } from "./../../icons";
import { useStateValue } from "../../contexts/context";
import { actionTypes } from "../../";
import importedStyles from "../../app/styles.module.css";

export default function Navigation({ className, login, pages }: any) {
  const location = useLocation();
  const [{ token, avatar }, dispatch] = useStateValue();
  const [menu, switchMenu] = useToggle(
    { show: false, name: "fas fa-bars p-2 item" },
    { show: true, name: "fas fa-times p-2 item" }
  );

  return (
    <div style={{ position: "relative" }}>
      <div className={`${className} ${styles.container}`}>
        <div className={styles.navbar_header}>
          <LinkRouter to="/">
            <LogoSVG></LogoSVG>
          </LinkRouter>
        </div>
        <nav className={styles.navbar.concat(" ", className)}>
          <i
            className={`${menu.name} ${styles.button}`}
            id="nav-button"
            onClick={switchMenu}
          ></i>
          <ul
            className={`${className} ${styles.itemlist} ${
              menu.show ? styles.show : ""
            }`}
          >
            {pages &&
              pages.map(({ to, label }: any, index: any) => {
                return (
                  <LinkRouter
                    className={`${styles.link} ${
                      to === location.pathname.replace("/", "") &&
                      styles.selected
                    }`}
                    type="button"
                    key={index}
                    to={to}
                    id={index}
                  >
                    {label}
                  </LinkRouter>
                );
              })}
            {login && (
              <LinkRouter
                className={` ${styles.link} ${styles.avatar}`}
                to={`/${login.to}`}
                onClick={!token && login?.onClick}
              >
                {token ? (
                  <img src={avatar} alt="Profile user avatar" />
                ) : (
                  "Login"
                )}
              </LinkRouter>
            )}
          </ul>
        </nav>
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
