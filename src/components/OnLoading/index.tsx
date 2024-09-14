import { useEffect } from "react";
import styles from "./styles.module.css";

export function OnLoading({
  children,
  loading,
  reset,
  delay = 3000,
  contain = "Loading",
}: any) {
  useEffect(() => {
    if (reset)
      setTimeout(() => {
        reset();
      }, delay);
  });
  return loading ? (
    <div className={styles.container}>
      {contain || children}
    </div>
  ) : null;
}
