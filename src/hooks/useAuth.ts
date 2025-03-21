import { useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { useStateValue } from "../context";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { URL_API } from "../services";

function useAuth() {
  const [token, setToken] = useLocalStorage("token", "");
  const [apiKey, setApiKey] = useLocalStorage("apiKey", "");
  const [expire, setExpire] = useLocalStorage("expire", 0);
  const [username, setUsername] = useLocalStorage("username", "");
  const [email, setEmail] = useLocalStorage("email", "");
  const [createdAt, setCreatedAt] = useLocalStorage("createdAt", "");
  const [privilege, setPrivilege] = useLocalStorage("privilege", "");
  const [avatar, setAvatar] = useLocalStorage("avatar", "");
  const navigate = useNavigate();

  const [{ token: globalToken }, dispatch]: any = useStateValue();
  const notify = () =>
    toast.info("Session Expired!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  useEffect(() => {
    if (expire && isExpired(expire)) {
      clearAuth();
      notify();
      navigate("/");
      return;
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
  }, []);

  const isExpired = (expire: number) => {
    expire = Number(expire) * 1000;
    const currentDateTime = Date.now();
    return expire < currentDateTime;
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
  }: any) => {
    dispatch({
      apiKey,
      expire,
      username,
      email,
      createdAt,
      privilege,
      avatar,
      token,
    });
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
    fetch(`${URL_API}/logout`, { method: "GET" });
    dispatch({
      apiKey: "",
      expire: "",
      username: "",
      email: "",
      createdAt: "",
      privilege: "",
      avatar: "",
      token: "",
    });
    setToken("");
    setApiKey("");
    setExpire(0);
    setUsername("");
    setEmail("");
    setCreatedAt("");
    setPrivilege("");
    setAvatar("");
  };

  return { token, apiKey, setAuth, clearAuth };
}

export { useAuth };
