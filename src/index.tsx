import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { addContext } from "./contexts";
import "./index.css";
import { setActions } from "./utils";
import content from "./db/content.json";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { lazyLoad, LazyComponent } from "./components/LazyComponent";
const App = lazyLoad(() => import("./app"), "App");
import { CubeGridLoader } from "./components/CubeGridLoader";

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
  isOnline: false,
  projects: [],
  projectsOptions: { stack: [], state: [], kind: [] },
  certificates: [],
  institutions: [],
  currentModal: null,
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
    [actionTypes.setIsOnline]: { ...state, isOnline: payload },
    [actionTypes.setProjects]: { ...state, projects: payload },
    [actionTypes.setProjectsOptions]: { ...state, projectsOptions: payload },
    [actionTypes.setCertificates]: { ...state, certificates: payload },
    [actionTypes.setInstitutions]: { ...state, institutions: payload },
    [actionTypes.reset]: {
      ...state,
      ...initialState,
    },
  };
  return actions[type] || state;
};
const { StateProvider } = addContext("Global", actionTypes);
const rootElement: any = document.getElementById("root");
const loaderElement: any = document.querySelector(".global-loader-container");
ReactDOM.createRoot(rootElement).render(
  <Router>
    <StateProvider {...{ initialState, reducer }}>
      <ToastContainer stacked />
      <LazyComponent
        Component={App}
        fallback={<CubeGridLoader style={{ height: "100vh", width: "100%" }} />}
      />
    </StateProvider>
  </Router>
);
if (loaderElement) {
  loaderElement.style.display = "none";
}
