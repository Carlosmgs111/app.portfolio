import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
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
  searchedUsername: "",
  currentLang: "en",
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
    [actionTypes.setSearchedUsername]: { ...state, searchedUsername: payload },
    [actionTypes.reset]: {
      ...state,
      ...initialState,
    },
  };
  return actions[type] || state;
};

const { StateProvider } = addContext("Global", actionTypes);
const rootElemnt: any = document.getElementById("root");
const root: any = ReactDOM.createRoot(rootElemnt);
root.render(
  <Router>
    <StateProvider {...{ initialState, reducer }}>
      <App />
    </StateProvider>
  </Router>
);
