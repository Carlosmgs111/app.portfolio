import styles from "./styles.module.css";
import { manyfy } from "../../utils";
import { Children, cloneElement, useRef, useEffect } from "react";
import { Memo } from "../Memo";

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
const handleScroll = ({
  prevContainerScrollLeft,
  containerRef,
  carouselRef,
  baseFactor,
}: any) => {
  if (
    containerRef.current.scrollLeft > prevContainerScrollLeft &&
    containerRef.current.scrollLeft >=
      carouselRef.current.offsetWidth / baseFactor
  ) {
    prevContainerScrollLeft = 0;
    containerRef.current.scrollLeft = 0;
    return;
  }
  if (
    containerRef.current.scrollLeft < prevContainerScrollLeft &&
    containerRef.current.scrollLeft === 0
  ) {
    prevContainerScrollLeft = carouselRef.current.offsetWidth / baseFactor;
    containerRef.current.scrollLeft =
      carouselRef.current.offsetWidth / baseFactor;
    return;
  }
  prevContainerScrollLeft = containerRef.current.scrollLeft;
};

export const InfiniteCarousel = ({
  children,
  toRight = false,
  pausable = true,
  timing = 10,
  gap = "4rem",
}: any) => {
  if (!children) return null;
  const simulatedGap = getSimulatedGap(gap);
  const carouselRef: any = useRef(null);
  const containerRef: any = useRef(null);
  const elements: any = Children.toArray(children).map(
    (child: any, index: any) => (
      <div key={index} className={styles.element}>
        <div
          style={{
            direction: "ltr",
            padding: ` 0 ${simulatedGap}`,
          }}
        >
          {cloneElement(child, {})}
        </div>
      </div>
    )
  );
  const baseFactor = 4;
  let prevContainerScrollLeft = 0;
  const throttledScroll = () =>
    requestAnimationFrame(() =>
      handleScroll({
        prevContainerScrollLeft,
        containerRef,
        carouselRef,
        baseFactor,
      })
    );
  useEffect(() => {
    if (!carouselRef.current || !containerRef.current) return;
    const duration =
      carouselRef.current && containerRef.current
        ? ((carouselRef.current.offsetWidth /
            containerRef.current.offsetWidth) *
            timing) /
          2
        : 0;
    containerRef.current.style.setProperty("--timing", `${duration}s`);
    containerRef.current.scrollLeft = prevContainerScrollLeft;
    containerRef.current.addEventListener("scroll", throttledScroll);
    return () => {
      if (!containerRef.current) return;
      return containerRef.current.removeEventListener(
        "scroll",
        throttledScroll
      );
    };
  }, [elements, timing]); // TODO check how to refresh addition of properties

  return (
    <Memo deps={[elements]}>
      <div ref={containerRef} className={styles.container}>
        <div
          ref={carouselRef}
          className={`
        ${styles.carousel} ${styles.animated} ${toRight ? styles.to_right : ""} 
        ${pausable ? styles.pausable : ""}`}
        >
          {manyfy(elements, baseFactor)}
        </div>
      </div>
    </Memo>
  );
};
