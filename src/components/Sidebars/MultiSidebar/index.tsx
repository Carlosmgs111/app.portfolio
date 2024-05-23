import { useState, Children, cloneElement, useEffect } from "react";
import styles from "./style.module.css";
import { SettingsDashboard } from "./SettingsDashboard";
import { useToggle } from "../../../hooks/useToggle";
import { injectAttrsToReactElements } from "../../../utils";
import { useStateValue } from "../../../contexts/context";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { MemoizedComponent } from "../../../components/MemoizedComponent";

export const MultiSidebar = (props: any) => {
  const {
    sidebars = [],
    children,
    width,
    float: _float = true,
    multi = true,
  } = props;
  const [expand, switchExpand] = useToggle(false, true);
  const [activeSidebars, setActiveSidebars] = useState([sidebars[0]?.props.id]);
  const [settingsDashboard, switchSettingsDashboard] = useToggle(false, true);
  const [sidebarFloat, setSidebarFloat] = useLocalStorage(
    "sidebarFloat",
    _float
  );
  const [, dispatch]: any = useStateValue();
  const [float, switchFloat] = useToggle(sidebarFloat, !sidebarFloat);

  useEffect(() => {
    dispatch({ type: "setSidebarFloat", payload: sidebarFloat });
    setSidebarFloat(float);
  }, [float]);

  const main = (
    <MemoizedComponent
      deps={[float, activeSidebars, sidebars, settingsDashboard]}
    >
      <div className={styles.container}>
        <div className={`${styles.main} ${float ? styles.floating : ""}`}>
          <section
            style={{ width: width || "fit-content", minWidth: "none" }}
            className={`${styles.sidebar} ${!width && styles.dinamic}`}
          >
            {sidebars.length > 1 && (
              <section className={styles.header}>
                {sidebars.map((sidebar: any, index: number) => (
                  <i
                    className={`${styles.item} ${
                      activeSidebars.includes(sidebar.props.id)
                        ? styles.active
                        : ""
                    } ${styles.button}`}
                    key={index}
                    onClick={() => setActiveSidebars([sidebar.props.id])}
                  ></i>
                ))}
                {activeSidebars.length !== sidebars.length && multi && (
                  <i
                    key="expand-button"
                    className={`${styles.item} fa-solid fa-ellipsis-vertical`}
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
                  isactive: Number(activeSidebars.includes(sidebar.props.id)),
                  key: index,
                  width: width
                    ? `${Number(
                        width.replace("px", "") / activeSidebars.length
                      )}px`
                    : "none",
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
    </MemoizedComponent>
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
