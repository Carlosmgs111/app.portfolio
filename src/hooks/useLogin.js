import { useState, useEffect } from "react";
import { useSwitch } from "./useSwitch";
import axios from "axios";
import config from "../config/config";
import { URL, URL_API } from "../services/index";
import { getContext, CONTEXTS } from "../contexts";
import { useLocalStorage } from "./useLocalStorage";

function useLogin() {
  const [, setBackgroundImage] = useLocalStorage("backgroundImage", "");
  const [{ useStateValue }, ACTIONS] = getContext(CONTEXTS.Global);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("" || config.email);
  const [password, setPassword] = useState("" || config.password);
  const [label, switchLabel] = useSwitch("signin", "signup");
  const [{ token }, dispatch] = useStateValue();

  async function onClick() {
    setLoading(true);
    try {
      const data = (
        await axios.get(
          `${URL_API}/${label === "signup" ? "request" + label : label}`,
          { email, password },
          { headers: { "Access-Control-Allow-Origin": "*" } }
        )
      ).data;
      console.log({data})
      if (label === "signin") {
        const { token, apiKey, expire } = data;
        dispatch({
          type: ACTIONS.setAuth,
          payload: { token, apiKey, expire },
        });
        setLoading(false);
      }else{
        console.log(data.message)
        setLoading(false);
        setError(false);
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
      setError(true);
    }
  }

  function onInputChange(e) {
    if (e.target.name === "password") {
      setPassword(e.target.value);
    }
    if (e.target.name === "email") {
      setEmail(e.target.value);
    }
  }

  return {
    email,
    password,
    label,
    switchLabel,
    onClick,
    onInputChange,
    loading,
    error,
    token,
  };
}

export { useLogin };
