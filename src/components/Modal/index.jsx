import { Children, cloneElement } from "react";
import styles from "./styles.module.css";

export const Modal = ({
  children,
  injected,
  setInjected = () => {},
  active = false,
  onClick = null,
  over = true,
  showCloseButton = true,
}) => {
  const isActive = active || Boolean(children) || Boolean(injected);
  return (
    <div
      className={`${styles.modal} 
      ${isActive ? styles.active : ""} 
      ${isActive && over ? styles.over : ""}`}
      {...{
        onClick: (e) => {
          if (e.target.id === "modal_body") setInjected(null);
        },
        over,
        isActive,
        id: "modal_body",
      }}
    >
      <div className={styles.main_container}>
        {Children.toArray(children || injected).map((child) =>
          cloneElement(child, {
            ...child.props,
            disabled: true,
            style: { maxHeight: "90vh" },
          })
        )}
        {showCloseButton && (
          <div className={styles.button_container}>
            <i
              className={`fa-solid fa-xmark ${styles.close_button}`}
              onClick={() => setInjected(null)}
            />
          </div>
        )}
      </div>
    </div>
  );
};
