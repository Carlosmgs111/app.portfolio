import { useEffect } from "react";
import styles from "./styles.module.css";

export function OnError({
  error = null,
  reset,
  useAlert = false,
  delay = 3000,
  message,
}) {
  useEffect(() => {
    error && reset && setTimeout(() => reset(), delay);
    error && useAlert && window.alert(error);
  }, [error]);

  return error ? (
    <div className={styles.message}>
      <p>{message ? message : error.message}</p>
    </div>
  ) : null;
}
