import styles from "./style.module.css";
import { useEffect, useRef, useState } from "react";

export const Image = ({
  src,
  $ref,
  style = {},
  onClick = () => {},
  alt = "",
  className = "",
  ...props
}: any) => {
  const nativeRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const ref = $ref || nativeRef;
  useEffect(() => {
    if (!ref.current) return;
    let tries = 0;
    const maxTries = 3;
    console.log(ref.current.complete);
    // if (ref.current.complete) setLoading(false);
    ref.current.addEventListener("error", () => {
      if (!ref.current) return;
      if (++tries < maxTries) {
        ref.current.src =
          "https://github.com/Carlosmgs111/assets-public/assets/41123597/c8364209-d4f5-4930-a782-e9d51f286511";
        setLoading(false);
      }
    });
    ref.current.addEventListener("load", () => {
      console.log(src, "loaded");
      setLoading(false);
    });
  }, [ref.current]);
  console.log({ loading });
  return (
    <div className={`${styles.container} ${className}`}>
      <div className={`${styles.loader} ${loading && styles.show}`}>
        Cargando...
      </div>
      <img
        alt={alt}
        className={`${styles.image} ${!loading && styles.show}`}
        src={src}
        ref={ref}
        style={style}
        onClick={onClick}
      />
    </div>
  );
};
