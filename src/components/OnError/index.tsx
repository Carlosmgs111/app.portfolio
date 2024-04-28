import { useEffect } from "react";
import styles from "./styles.module.css";
import { toast, Zoom } from "react-toastify";

export function OnError({
  error = null,
  reset,
  useAlert = false,
  delay = 3000,
  message,
  toastNotifify = true,
}: any) {
  const notify = (message: string) =>
    toast.error(message || "Un error ha ocurrido! 😥", {
      position: "top-center",
      autoClose: delay,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Zoom,
    });
  useEffect(() => {
    error && reset && setTimeout(() => reset(), delay);
    error && useAlert && window.alert(error);
  }, [error]);
  error && toastNotifify && notify(error.message);
  return (
    error &&
    !toastNotifify && (
      <div className={styles.message}>
        <p>{message ? message : error.message}</p>
      </div>
    )
  );
}
