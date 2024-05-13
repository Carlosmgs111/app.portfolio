import styles from "./styles.module.css";
import { Children, cloneElement } from "react";
export const Slider = ({ children, toRight = false }: any) => {
  const slides: any = Children.toArray(children).map(
    (child: any, index: any) => (
      <div key={index} className={styles.slide}>
        {cloneElement(child)}
      </div>
    )
  );
  return (
    <div className={styles.container}>
      <div className={`${styles.slider} ${toRight ? styles.to_right : ""}`}>
        {slides}
        {slides}
      </div>
    </div>
  );
};
