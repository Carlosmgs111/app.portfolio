import styles from "./styles.module.css";
const slides = [
  <div className={styles.slide}>01</div>,
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
