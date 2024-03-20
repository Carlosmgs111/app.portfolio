import styles from "./styles.module.css";
import { JestSVG } from "../../icons";
const slides = [
  <div className={styles.slide}>
    <div className={styles.icon_container}>
      <JestSVG></JestSVG>
    </div>
  </div>,
  <div className={styles.slide}>02</div>,
  <div className={styles.slide}>03</div>,
  <div className={styles.slide}>04</div>,
  <div className={styles.slide}>05</div>,
  <div className={styles.slide}>06</div>,
  <div className={styles.slide}>07</div>,
];
export const Slider = () => {
  return (
    <div className={styles.container}>
      <div className={styles.slider}>
        {slides}
        {slides}
      </div>
    </div>
  );
};
