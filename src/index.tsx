import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { addContext } from "./contexts";
import "./index.css";
import { App } from "./app";
import { setActions } from "./utils";
import content from "../public/content.json";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const { defaultLang } = content;

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
  searchedusername: "",
  currentLang: defaultLang,
  sidebarFloat: true,
};

export const actionTypes: any = setActions(
  ["setAuth", "setLoading"],
  initialState
);
const reducer = (state: any, action: any) => {
  const { payload, type } = action;
  const actions = {
    [actionTypes.setAuth]: {
      ...state,
      ...payload,
    },
    [actionTypes.setLoading]: { ...state, loading: payload },
    [actionTypes.setSearchedusername]: { ...state, searchedusername: payload },
    [actionTypes.setCurrentLang]: { ...state, currentLang: payload },
    [actionTypes.setSidebarFloat]: { ...state, sidebarFloat: payload },
    [actionTypes.reset]: {
      ...state,
      ...initialState,
    },
  };
  return actions[type] || state;
};

const { StateProvider } = addContext("Global", actionTypes);
const rootElement: any = document.getElementById("root");
ReactDOM.createRoot(rootElement).render(
  <Router>
    <StateProvider {...{ initialState, reducer }}>
      <ToastContainer />
      <App />
    </StateProvider>
  </Router>
);
