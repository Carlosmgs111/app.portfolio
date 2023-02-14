import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter as Router,
} from "react-router-dom";
import { addContext } from "./contexts";
import "./index.css";
import { App } from "./app";
import { setActions } from "./utils";

const initialState = {
  token: "",
  apiKey: "",
  expire: "",
  username: "",
  email: "",
  createdAt: "",
  privilege: "",
  avatar: "",
  loading: true,
};

export const actionTypes = setActions(["setAuth", "setLoading"], initialState);
console.log({ actionTypes });

const reducer = (state, action) => {
  const { payload, type } = action;
  console.log({ payload, type });
  const actions = {
    [actionTypes.setAuth]: {
      ...state,
      apiKey: payload?.apiKey,
      token: payload?.token,
      expire: payload?.expire,
      username: payload?.username,
      email: payload?.email,
      createdAt: payload?.createdAt,
      privilege: payload?.privilege,
      avatar: payload?.avatar,
      loading: false,
    },
    [actionTypes.setLoading]: { ...state, loading: payload },
    [actionTypes.reset]: {
      ...state,
      ...initialState,
    },
  };
  return actions[type] || state;
};

const { StateProvider } = addContext("Global", actionTypes);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <StateProvider {...{ initialState, reducer }}>
      <App />
    </StateProvider>
  </Router>
);
