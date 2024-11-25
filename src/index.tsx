import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { StateProvider } from "./context";
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
const rootElement: any = document.getElementById("root");
ReactDOM.createRoot(rootElement).render(
  <StateProvider {...{ initialState }}><script src="https://unpkg.com/react-scan/dist/auto.global.js"></script>
    <BrowserRouter>
      <ToastContainer stacked />
      <App />
    </BrowserRouter>
  </StateProvider>
);
