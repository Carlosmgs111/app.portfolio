import { useEffect } from "react";
import { getContext, CONTEXTS } from "../contexts";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { URL_SYNAPSE, URL_GRAPHQL } from "../services/index";
import { BatchHttpLink } from "@apollo/client/link/batch-http";
import { useAuth } from "./useAuth";
import { useLocalStorage } from "./useLocalStorage";

export function useApp() {
  const [{ useStateValue }, ACTIONS] = getContext(CONTEXTS.Global);
  const { token, apiKey, expire, setAuth, clearAuth } = useAuth();
  const [state, dispatch] = useStateValue();
  const auth = {
    Authorization: `Bearer ${state.token}`,
    apiKey: state.apiKey,
  };

  console.log({ state });

  useEffect(() => {
    if (!token) {
      setAuth({
        apiKey: state.apiKey,
        token: state.token,
        expire: state.expire,
        username: state.username,
      });
      //  setBackgroundImage(defaultBackgroundImage);
    }
  }, [state.token, token]);

  return { clearAuth };
}
