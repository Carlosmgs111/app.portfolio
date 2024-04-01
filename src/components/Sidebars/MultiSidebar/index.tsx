import { useState, Children, cloneElement, useEffect } from "react";
import styles from "./style.module.css";
import { SettingsDashboard } from "./SettingsDashboard";
import { useToggle } from "../../../hooks/useToggle";
import { injectAttrsToReactElements } from "../../../utils";
import { useStateValue } from "../../../contexts/context";
import { useLocalStorage } from "../../../hooks/useLocalStorage";

export const MultiSidebar = (props: any) => {
  const { sidebars = [], children } = props;
  const [expand, switchExpand] = useToggle(false, true);
  const [activeSidebars, setActiveSidebars] = useState([sidebars[0]?.props.id]);
  const [settingsDashboard, switchSettingsDashboard] = useToggle(false, true);
  const [sidebarFloat, setSidebarFloat] = useLocalStorage("sidebarFloat", true);
  const [, dispatch] = useStateValue();
  const [float, switchFloat] = useToggle(sidebarFloat, !sidebarFloat);

  useEffect(() => {
    dispatch({ type: "setSidebarFloat", payload: sidebarFloat });
    setSidebarFloat(float);
  }, [float]);

  const main = (
    <div className={styles.container}>
      <div className={`${styles.main} ${float ? styles.floating : ""}`}>
        <section className={styles.sidebar}>
          {sidebars.length > 1 && (
            <section className={styles.header}>
              {sidebars.map((sidebar: any, index: number) => (
                <i
                  className={`${styles.item} ${
                    activeSidebars.includes(sidebar.props.id)
                      ? styles.active
                      : ""
                  }`}
                  key={index}
                  onClick={() => setActiveSidebars([sidebar.props.id])}
                >
                  {index + 1}
                </i>
              ))}
              {activeSidebars.length !== sidebars.length && (
                <i
                  key="expand-button"
                  className={`${styles.item} fa-solid fa-ellipsis`}
                  onClick={() =>
                    setActiveSidebars([
                      ...sidebars.map((sidebar: any) => sidebar.props.id),
                    ])
                  }
                />
              )}
            </section>
          )}
          <section
            className={`${styles.body} ${
              activeSidebars.length > 1 ? styles.active : ""
            }`}
          >
            {sidebars.map((sidebar: any, index: number) =>
              injectAttrsToReactElements([sidebar], {
                active: activeSidebars.includes(sidebar.props.id),
                key: index,
              })
            )}
          </section>
          <section className={styles.footer}>
            <i
              key="settings-button"
              className={`fa-solid fa-gear ${styles.rotable} ${styles.item} ${
                settingsDashboard ? styles.active : ""
              }`}
              onClick={switchSettingsDashboard}
            ></i>
          </section>
        </section>
        <SettingsDashboard
          {...{
            float,
            switchFloat,
            settingsDashboard,
            switchSettingsDashboard,
          }}
        />
      </div>
    </div>
  );

  return children ? (
    <div className={styles.wrapper}>
      {main}
      {Children.toArray(children).map((child: any) =>
        cloneElement(child, {
          ...child.props,
        })
      )}
    </div>
  ) : (
    main
  );
};
