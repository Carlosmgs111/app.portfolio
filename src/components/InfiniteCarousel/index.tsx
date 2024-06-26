import styles from "./styles.module.css";
import { manyfy } from "../../utils";
import { Children, cloneElement, useRef, useEffect } from "react";

const getSimulatedGap = (measureSize: string | number) => {
  measureSize = String(measureSize);
  let measureValue = "";
  let measureUnit = "";
  measureSize.split("").forEach((char: string) => {
    if (!isNaN(Number(char))) return (measureValue += char);
    measureUnit += char;
  });
  return `${Number(measureValue) / 2}${measureUnit}`;
};

export const Slider = ({
  children,
  toRight = false,
  pausable = true,
  timing = 4,
  height = "40rem",
  gap = "4rem",
}: any) => {
  const simulatedGap = getSimulatedGap(gap);
  const sliderRef: any = useRef(null);
  const containerRef: any = useRef(null);
  const slidesLength = children.length;
  const slides: any = Children.toArray(children).map(
    (child: any, index: any) => (
      <div key={index} className={styles.slide}>
        <div style={{ direction: "ltr", padding: ` 0 ${simulatedGap}` }}>
          {cloneElement(child, {})}
        </div>
      </div>
    )
  );
  const baseFactor = 4;
  useEffect(() => {
    const slider = sliderRef.current;
    const container = containerRef.current;
    if (!slider || !container) return;
    let prevContainerScrollLeft = 0;
    container.style.setProperty("--timing", `${timing * baseFactor}s`);

    const handleScroll = () => {
      if (
        container.scrollLeft > prevContainerScrollLeft &&
        container.scrollLeft >= slider.offsetWidth / baseFactor
      ) {
        prevContainerScrollLeft = 0;
        container.scrollLeft = 0;
        return;
      }
      if (
        container.scrollLeft < prevContainerScrollLeft &&
        container.scrollLeft === 0
      ) {
        prevContainerScrollLeft = slider.offsetWidth / baseFactor;
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
