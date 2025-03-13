import { useMemo } from "react";
import styles from "./styles.module.css";
import { shuffleArray } from "../../utils";

const Memo = ({ children, deps = [] }: any) => {
  return useMemo(() => children, deps);
};

const Orb = ({ colorA, colorB, min, max }: any) => {
  const width = Math.floor(Math.random() * (max - min + 1)) + min;
  const x = Math.floor(Math.random() * 100) + "%";
  const y = Math.floor(Math.random() * 100) + "%";
  return (
    <div
      style={
        {
          "--color-a": colorA,
          "--color-b": colorB,
          "--width": `${width}px`,
          "--x": x,
          "--y": y,
        } as React.CSSProperties
      }
      className={styles.orb}
    />
  );
};

export const Orbs = ({
  sizeRange = [50, 250],
  qty = 10,
  colors = ["#ff00ff", "#00ffff"],
  randomize = false,
}) => {
  return (
    <Memo deps={[]}>
      <div className={styles.container}>
        {Array.from({ length: qty }).map((_, i) => {
          const [colorA, colorB] = randomize
            ? shuffleArray(colors)
            : shuffleArray(colors).slice(0, 2);
          return (
            <Orb
              key={i}
              colorA={colorA}
              colorB={colorB}
              min={sizeRange[0]}
              max={sizeRange[1]}
            />
          );
        })}
      </div>
    </Memo>
  );
};
