import styles from "./styles.module.css";
import { ReactNodeTest } from "../ReactNodeTest";
import { useLocation } from "react-router-dom";

export const AppBackground = ({ children }: any) => {
  const { pathname } = useLocation();

  return (
    <>
      <div className={styles.background}></div>
      <div className={styles.foreground}>
        {pathname === "/" && (
          <ReactNodeTest className={styles.blueprint}></ReactNodeTest>
        )}
      </div>
      {children}
    </>
  );
};
