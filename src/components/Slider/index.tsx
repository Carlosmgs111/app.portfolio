import styles from "./styles.module.css";
import {
  JestSVG,
  ReactSVG,
  StyledComponentsSVG,
  NextjsSVG,
  ReactRouterSVG,
  WebpackSVG,
  AxiosSVG,
} from "../../icons";
const slides = [
  <div className={styles.slide}>
    <div className={styles.icon_container}>
      <JestSVG></JestSVG>
    </div>
  </div>,
  <div className={styles.slide}>
    <div className={styles.icon_container}>
      <ReactSVG></ReactSVG>
    </div>
  </div>,
  <div className={styles.slide}>
    <div className={styles.icon_container}>
      <StyledComponentsSVG></StyledComponentsSVG>
    </div>
  </div>,
  <div className={styles.slide}>
    <div className={styles.icon_container}>
      <NextjsSVG></NextjsSVG>
    </div>
  </div>,
  <div className={styles.slide}>
    <div className={styles.icon_container}>
      <ReactRouterSVG></ReactRouterSVG>
    </div>
  </div>,
  <div className={styles.slide}>
    <div className={styles.icon_container}>
      <WebpackSVG></WebpackSVG>
    </div>
  </div>,
  <div className={styles.slide}>
    {" "}
    <div className={styles.icon_container}>
      <AxiosSVG></AxiosSVG>
    </div>
  </div>,
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
