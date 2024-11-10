import styles from "./styles.module.css";
import { useLocation } from "react-router-dom";
import { COA } from "../COA";
import { Video } from "../Video";

export const AppBackground = () => {
  const { pathname } = useLocation();
  return (
    <>
      <div className={styles.background}></div>
      <div className={styles.foreground}>
        <COA />
      </div>
      <section className={`${styles.hero}`}>
        <Video
          className={`${styles.video}`}
          src={
            "https://github.com/user-attachments/assets/a4adcad9-67cb-4573-9b72-253f2dac23b4"
          }
          pause={pathname !== "/"}
          autoPlay
          muted
          loop
          playsInline
        ></Video>
      </section>
    </>
  );
};
