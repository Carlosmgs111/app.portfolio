import { useEffect } from "react";
import { Message } from "./styles";

export function OnError({
  error,
  reset,
  useAlert = false,
  delay = 3000,
  message,
}) {
  useEffect(() => {
    if (reset)
      setTimeout(() => {
        reset();
      }, delay);
    if (error) if (useAlert) window.alert(error);
  }, [error]);

  return error ? (
    <Message>
      <p>{message ? message : error.message}</p>
    </Message>
  ) : null;
}
