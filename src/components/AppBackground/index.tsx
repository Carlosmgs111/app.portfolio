import styles from "./styles.module.css";
import { useLocation } from "react-router-dom";
import { COA } from "../COA";

export const AppBackground = () => {
  const { pathname } = useLocation();
  return (
    <div className={styles.bg}>
      <div className={styles.background}></div>
      <div className={styles.foreground}>
        <COA />
      </div>
    </div>
  );
};
