import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { addContext } from "./contexts";
import "./index.css";
import content from "./mocks/content.json";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { App } from "./app";

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
  loading: false,
  searchedusername: "",
  language: defaultLang,
  sidebarFloat: true,
  isOnline: false,
  projects: [],
  projectsOptions: { stack: [], state: [], kind: [] },
  certificates: [],
  institutions: [],
  currentModal: null,
};
const { StateProvider } = addContext("Global");
const rootElement: any = document.getElementById("root");
ReactDOM.createRoot(rootElement).render(
  <StateProvider {...{ initialState }}>
    <BrowserRouter>
      <ToastContainer stacked />
      <App />
    </BrowserRouter>
  </StateProvider>
);
