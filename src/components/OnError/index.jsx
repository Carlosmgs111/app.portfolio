import { useEffect } from "react";
import { Message } from "./styles";

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
    <Message>
      <p>{message ? message : error.message}</p>
    </Message>
  ) : null;
}
