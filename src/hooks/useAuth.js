import { useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { getContext, CONTEXTS } from "../contexts";

function useAuth() {
  const [{ useStateValue }, ACTIONS] = getContext(CONTEXTS.Global);
  const [token, setToken] = useLocalStorage("token", "");
  const [apiKey, setApiKey] = useLocalStorage("apiKey", "");
  const [expire, setExpire] = useLocalStorage("expire", "");
  const [username, setUsername] = useLocalStorage("username", "");

  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    if (!expireValidation(expire) && expire) {
      window.alert("Session expired!");
      clearAuth();
    }
    dispatch({
      type: ACTIONS.setAuth,
      payload: { token, apiKey, expire, username },
    });
  }, [token, apiKey]);

  const expireValidation = (expire) => {
    const currentDateTime = Date.parse(new Date(Date.now()));
    return currentDateTime < expire;
  };

  const setAuth = ({ token, apiKey, expire, username }) => {
    if (expire) expire = Date.parse(new Date(Date.now())) + Number(expire);
    setToken(token);
    setApiKey(apiKey);
    setExpire(expire);
    setUsername(username);
  };

  const clearAuth = () => {
    setToken("");
    setApiKey("");
    setExpire("");
    setUsername("");
  };

  return { token, apiKey, setAuth, clearAuth };
}

export { useAuth };
