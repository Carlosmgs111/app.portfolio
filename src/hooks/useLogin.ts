import { useState, useEffect } from "react";
import { useToggle } from "./useToggle";
import axios from "axios";
import config from "../config";
import { URL, URL_API } from "../services/index";
import { getContext, CONTEXTS } from "../contexts";
import { decodeJwt } from "jose";
import { useAuth } from "./useAuth";

function useLogin() {
  const [{ useStateValue }, ACTIONS] = getContext(CONTEXTS.Global);
  const [{ token }] = useStateValue();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("" /* || config.email */);
  const [username, setUsername] = useState("" || config.username);
  const [password, setPassword] = useState("" || config.password);
  const [label, switchLabel] = useToggle("signin", "signup");
  const { setAuth } = useAuth();

  const signPack: any = { password, username };
  if (email) signPack.email = email;

  async function onClick(e: any) {
    e.preventDefault();
    setLoading(true);
    try {
      const data = (
        await axios.post(`${URL_API}/${label}`, signPack, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        })
      ).data;
      if (label === "signin") {
        const { token } = data;
        const { email, createdAt, privilege, username, exp, avatar, apiKey } =
          decodeJwt(token);
        setAuth({
          token,
          apiKey,
          expire: exp,
          username,
          createdAt,
          email,
          privilege,
          avatar,
        });
        setLoading(false);
      } else {
        setLoading(false);
        setError(false);
      }
    } catch (e) {
      setLoading(false);
      setError(true);
    }
  }

  function onInputChange(e: any) {
    if (e.target.name === "password") setPassword(e.target.value);
    if (e.target.name === "username") setUsername(e.target.value);
    if (e.target.name === "email") setEmail(e.target.value);
  }

  return {
    email,
    username,
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
