import { useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { getContext, CONTEXTS } from "../contexts";

function useAuth() {
  const [{ useStateValue }, ACTIONS] = getContext(CONTEXTS.Global);
  const [token, setToken] = useLocalStorage("token", "");
  const [apiKey, setApiKey] = useLocalStorage("apiKey", "");
  const [expire, setExpire] = useLocalStorage("expire", "");
  const [username, setUsername] = useLocalStorage("username", "");
  const [email, setEmail] = useLocalStorage("email", "");
  const [createdAt, setCreatedAt] = useLocalStorage("createdAt", "");
  const [privilege, setPrivilege] = useLocalStorage("privilege", "");

  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    if (!expireValidation(expire) && expire) {
      window.alert("Session expired!");
      clearAuth();
    }
    dispatch({
      type: ACTIONS.setAuth,
      payload: { token, apiKey, expire, username, email, createdAt, privilege },
    });
  }, [token, apiKey]);

  const expireValidation = (expire) => {
    const currentDateTime = Date.parse(new Date(Date.now()));
    return currentDateTime < expire;
  };

  const setAuth = ({
    token,
    apiKey,
    expire,
    username,
    email,
    createdAt,
    privilege,
  }) => {
    if (expire) expire = Date.parse(new Date(Date.now())) + Number(expire);
    setToken(token);
    setApiKey(apiKey);
    setExpire(expire);
    setUsername(username);
    setCreatedAt(createdAt);
    setEmail(email);
    setPrivilege(privilege);
  };

  const clearAuth = () => {
    setToken("");
    setApiKey("");
    setExpire("");
    setUsername("");
    setEmail("");
    setCreatedAt("");
    setPrivilege("");
  };

  return { token, apiKey, setAuth, clearAuth };
}

export { useAuth };
