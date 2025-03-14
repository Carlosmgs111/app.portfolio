import styles from "./styles.module.css";
import { useToggle } from "../../hooks/useToggle";
import { useResizeHTMLElement } from "../../hooks/useResize";
import { LogoSVG } from "./../../icons";
import { useStateValue } from "../../context";
import { Linkdex } from "./Linkdex";
import { useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ToggleButton } from "../../components/ToggleButton";

export default function Navigation({ className, login, pages }: any) {
  const [{ token, avatar, language: globalLanguage }, dispatch]: any =
    useStateValue();
  const { pathname } = useLocation();
  const referencesRefs: any = useRef({});
  const [menu, switchMenu] = useToggle(
    { show: false, name: "fas fa-bars p-2 item" },
    { show: true, name: "fas fa-times p-2 item" }
  );
  const [language, toggleLanguage] = useToggle("es", "en");
  const indicatorRef: any = useRef(null);
  const adjustIndicatorSizes = (pathname: string) => {
    if (!referencesRefs.current || !indicatorRef.current) return;

    const pathKey = pathname.split("/")[1];
    const currentPathRef = referencesRefs.current[pathKey];

    if (!currentPathRef || !currentPathRef.current) {
      Object.assign(indicatorRef.current.style, {
        scale: "0",
        opacity: "0",
      });
      return;
    }

    const { offsetLeft, offsetWidth, offsetHeight, offsetTop } =
      currentPathRef.current;

    Object.assign(indicatorRef.current.style, {
      scale: "1",
      opacity: "1",
      left: `${offsetLeft}px`,
      width: `${offsetWidth}px`,
      top: `${offsetTop}px`,
      height: `${offsetHeight}px`,
    });
  };
  const navbarContainerRef = useResizeHTMLElement(() => {
    adjustIndicatorSizes(pathname);
  }, [pathname]);

  useEffect(() => {
    adjustIndicatorSizes(pathname);
  }, [pathname]);

  useEffect(() => {
    if (!referencesRefs.current[pathname.split("/")[1]]) {
      indicatorRef.current.style.scale = "0";
      indicatorRef.current.style.opacity = "0";
      return;
    }
    const { offsetLeft, offsetWidth, offsetHeight } =
      referencesRefs.current[pathname.split("/")[1]].current;
    indicatorRef.current.style.scale = "1";
    indicatorRef.current.style.opacity = "1";
    indicatorRef.current.style.left = `${offsetLeft}px`;
    indicatorRef.current.style.width = `${offsetWidth}px`;
    indicatorRef.current.style.height = `${offsetHeight}px`;
  }, [pathname]);

  useEffect(() => {
    dispatch({ language });
  }, [language]);

  return (
    <div ref={navbarContainerRef} className={styles.navbar_container}>
      <div className={`${className} ${styles.navbar}`}>
        <div className={styles.navbar_header}>
          <Linkdex
            className={styles.banner}
            onClick={() => menu.show && switchMenu()}
            to=" "
          >
            <LogoSVG></LogoSVG>
          </Linkdex>
          <i
            className={`${menu.name} ${styles.button}`}
            id="nav-button"
            onClick={switchMenu}
          ></i>
        </div>
        <nav className={styles.navbar_indexes.concat(" ", className)}>
          <ul
            className={`${className} ${styles.itemlist} ${
              menu.show ? styles.show : ""
            }`}
          >
            <span
              ref={indicatorRef}
              id="navbar_indicator"
              className={styles.indicator}
            ></span>
            {pages &&
              pages.map(({ to, icon, label }: any, index: any) => {
                referencesRefs.current[to] = { current: null };
                const linkRef = referencesRefs.current[to];
                return (
                  <Linkdex
                    linkRef={linkRef}
                    key={index}
                    to={to}
                    id={index}
                    onClick={() => menu.show && switchMenu()}
                  >
                    <i className={icon}></i>&nbsp;&nbsp;
                    {label}
                  </Linkdex>
                );
              })}
            {login && (
              <Linkdex
                className={styles.avatar}
                to={login.to}
                onClick={!token && login?.onClick}
              >
                {token ? (
                  <img
                    src={avatar}
                    onClick={() => menu.show && switchMenu()}
                    alt="Profile user avatar"
                  />
                ) : (
                  "Login"
                )}
              </Linkdex>
            )}
          </ul>
        </nav>
      </div>
      <div className={`${styles.page_settings}  ${menu.show && styles.show}`}>
        <div className={styles.languages}>
          <ToggleButton
            value={language}
            onChange={toggleLanguage}
            backgrounds={["var(--main-color-400)"]}
            labels={["ES", "EN"]}
            sliders={["fa-solid fa-globe"]}
          ></ToggleButton>
        </div>
      </div>
    </div>
  );
}
