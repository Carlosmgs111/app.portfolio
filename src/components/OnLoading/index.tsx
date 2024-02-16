import { useEffect } from "react";
import styles from "./styles.module.css";

export function OnLoading({
  children,
  loading,
  reset,
  delay = 3000,
  contain = "Loading",
  component,
}: any) {
  useEffect(() => {
    if (reset)
      setTimeout(() => {
        reset();
      }, delay);
  });

  return loading ? (
    <div className={styles.container.concat(" ", component)}>
      {contain || children}
    </div>
  ) : null;
}
