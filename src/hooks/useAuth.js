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
  const [avatar, setAvatar] = useLocalStorage("avatar", "");

  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    if (!expireValidation(expire) && expire) {
      window.alert("Session expired!");
      clearAuth();
    }
    setAuth({
      token,
      apiKey,
      expire,
      username,
      email,
      createdAt,
      privilege,
      avatar,
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
    avatar,
  }) => {
    dispatch({
      type: ACTIONS.setAuth,
      payload: {
        token,
        apiKey,
        expire,
        username,
        email,
        createdAt,
        privilege,
        avatar,
      },
    });
    if (expire) expire = Date.parse(new Date(Date.now())) + Number(expire);
    setToken(token);
    setApiKey(apiKey);
    setExpire(expire);
    setUsername(username);
    setCreatedAt(createdAt);
    setEmail(email);
    setPrivilege(privilege);
    setAvatar(avatar);
  };

  const clearAuth = () => {
    setToken("");
    setApiKey("");
    setExpire("");
    setUsername("");
    setEmail("");
    setCreatedAt("");
    setPrivilege("");
    setAvatar("");
  };

  return { token, apiKey, setAuth, clearAuth };
}

export { useAuth };
