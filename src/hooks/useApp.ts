import { useEffect } from "react";
import { useAuth } from "./useAuth";

export function useApp() {
  const { clearAuth } = useAuth();

  useEffect(() => {}, []);

  return { clearAuth };
}
