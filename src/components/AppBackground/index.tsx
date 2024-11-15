import styles from "./styles.module.css";
import { useLocation } from "react-router-dom";
import { COA } from "../COA";
import { Memo } from "../Memo";

export const AppBackground = () => {
  const { pathname } = useLocation();
  return (
    <Memo>
      <div className={styles.background}></div>
      <div className={styles.foreground}>
         <COA />
      </div>
    </Memo>
  );
};
