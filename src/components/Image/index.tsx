import styles from "./style.module.css";
import { useEffect, useRef } from "react";

export const Image = ({
  src,
  $ref = { current: null },
  style = {},
  onClick = () => {},
  alt = "",
  className = "",
  ...props
}: any) => {
  const ref = useRef($ref);
  useEffect(() => {
    let tries = 0;
    const maxTries = 3;
    if (!ref.current) return;
    ref.current.addEventListener("error", () => {
      if (!ref.current) return;
      if (++tries < maxTries)
        ref.current.src =
          "https://github.com/Carlosmgs111/assets-public/assets/41123597/c8364209-d4f5-4930-a782-e9d51f286511";
    });
  }, [ref]);
  return (
    <img
      alt={alt}
      className={className || styles.image}
      src={src}
      ref={ref}
      style={style}
      onClick={onClick}
    />
  );
};
