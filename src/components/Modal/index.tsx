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
}: any) => {
  const isActive = active || Boolean(children) || Boolean(injected);
  return (
    <div
      className={`${styles.modal} 
      ${isActive ? styles.active : ""} 
      ${isActive && over ? styles.over : ""}`}
      {...{
        onClick: (e: any) => {
          if (e.target.id === "modal_body") setInjected({ currentModal: null });
        },
        id: "modal_body",
      }}
    >
      <div className={styles.main_container}>
        {Children.toArray(children || injected).map((child: any) =>
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
              onClick={() => setInjected({ currentModal: null })}
            />
          </div>
        )}
      </div>
    </div>
  );
};
