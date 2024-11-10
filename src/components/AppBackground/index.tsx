import styles from "./styles.module.css";
import { useLocation } from "react-router-dom";
import { COA } from "../COA";
import { Video } from "../Video";
import videoSrc from "../../assets/videos/hero.mp4";

export const AppBackground = () => {
  const { pathname } = useLocation();
  return (
    <>
      <div className={styles.background}></div>
      <div className={styles.foreground}>
        <COA />
      </div>
      <section
        className={`${styles.hero} ${pathname !== "/" && styles.hidden}`}
      >
        <Video
          className={`${styles.video}`}
          src={videoSrc}
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
