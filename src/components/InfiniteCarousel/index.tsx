import styles from "./styles.module.css";
import { manyfy } from "../../utils";
import { Children, cloneElement, useRef, useEffect } from "react";
export const Slider = ({
  children,
  toRight = false,
  pausable = true,
  timing = 10,
  height = "40rem",
  gap = "4rem",
}: any) => {
  const sliderRef: any = useRef(null);
  const containerRef: any = useRef(null);
  const slidesLength = children.length;
  const slides: any = Children.toArray(children).map(
    (child: any, index: any) => (
      <div key={index} className={styles.slide}>
        <div style={{ direction: "ltr" }}>{cloneElement(child, {})}</div>
      </div>
    )
  );
  const baseFactor = 4;
  useEffect(() => {
    const slider = sliderRef.current;
    const container = containerRef.current;
    if (!slider || !container) return;
    let prevContainerScrollLeft = 1;
    container.style.setProperty("--timing", `${timing * baseFactor}s`);

    const handleScroll = () => {
      if (
        container.scrollLeft > prevContainerScrollLeft &&
        container.scrollLeft >= slider.offsetWidth / baseFactor
      ) {
        prevContainerScrollLeft = -1;
        container.scrollLeft = 0;
        return;
      }
      if (
        container.scrollLeft < prevContainerScrollLeft &&
        container.scrollLeft === 0
      ) {
        prevContainerScrollLeft = slider.offsetWidth / baseFactor + 1;
        container.scrollLeft = slider.offsetWidth / baseFactor;
        return;
      }
      prevContainerScrollLeft = container.scrollLeft;
    };
    container.scrollLeft = prevContainerScrollLeft;
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div style={{ height }} ref={containerRef} className={styles.container}>
      <div
        style={{ gap }}
        ref={sliderRef}
        className={`
        ${styles.slider} ${styles.animated} ${toRight ? styles.to_right : ""} 
        ${pausable ? styles.pausable : ""}`}
      >
        {manyfy(slides, baseFactor)}
        {slidesLength < 4 && manyfy(slides, baseFactor)}
        {slidesLength < 4 && manyfy(slides, baseFactor)}
        {slidesLength < 6 && manyfy(slides, baseFactor)}
        {slidesLength < 6 && manyfy(slides, baseFactor)}
      </div>
    </div>
  );
};
