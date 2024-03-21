import styles from "./styles.module.css";
import { Children, cloneElement } from "react";
export const Slider = ({ children }: any) => {
  const slides: any = Children.toArray(children).map((child: any) => (
    <div className={styles.slide}>{cloneElement(child)}</div>
  ));
  return (
    <div className={styles.container}>
      <div className={`${styles.slider} ${styles.to_right}`}>
        {slides}
        {slides}
      </div>
    </div>
  );
};
