import styles from "./styles.module.css";
import Navigation from "../components/Navigation";
import { Login } from "../components/Login";
import { useStateValue } from "../contexts/context";
import { useApp } from "../hooks/useApp";
import { useToggle } from "../hooks/useToggle";
import { Modal } from "../components/Modal";
import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Router } from "../components/Router";
import { Footer } from "../components/Footer";
import { LiveChat } from "../components/LiveChat";
import content from "../db/content.json";
import { URL_API } from "../services";
import { actionTypes } from "../";
import { toast, Zoom } from "react-toastify";
import { lazyLoad, LazyComponent } from "../components/LazyComponent";
import { CubeGridLoader } from "../components/CubeGridLoader";
import { Memo } from "../components/Memo";

export function App() {
  const { clearAuth } = useApp();
  const router = useNavigate();
  const [{ currentLang, isOnline, token }, dispatch] = useStateValue();
  const [showFixed, setShowFixed] = useState(false);
  const [currentModal, setCurrentModal]: any = useState(null);
  const [showChat, toggleShowChat] = useToggle(false, true);

  useEffect(() => {
    const onScroll = (e: any) => {
      const newShowFixed = window.scrollY > 200;
      showFixed !== newShowFixed &&
        setTimeout(() => setShowFixed(newShowFixed), 500); // ? delay effect 500 ms
    };
    document.addEventListener("scroll", onScroll);
  }, [showFixed]);

  useEffect(() => {
    fetch(`${URL_API}/checkifisonline`)
      .then((response: any) => response.json())
      .then((response) =>
        dispatch({ type: actionTypes.setIsOnline, payload: response })
      );
  }, []);

  useEffect(() => {
    const notify = ({ message, kind = "success" }: any = {}) => {
      const options: any = {
        position: "top-center",
        autoClose: 8000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Zoom,
        style: { fontSize: "1.2rem", color: "black", textAlign: "justify" },
        icon: false,
        closeButton: false,
        onClick: toggleShowChat,
      };
      const notifyKinds: any = {
        success: toast.success,
        error: toast.error,
      };
      notifyKinds[kind](message || "Peticion completada!", options);
    };
    isOnline &&
      !token &&
      notify({
        message: (
          <p>
            Hola 👋, me encuentro conectado, solo por si quieres conversar un
            rato conmigo 👍, pulsa el boton verde&nbsp;
            <i
              style={{
                backgroundColor: "#52c234",
                padding: "1%",
                borderRadius: "4px",
              }}
              className="fa-regular fa-comment-dots"
            ></i>&nbsp;
            ubicado en la parte inferior derecha ↘️ que dice `online`, o dando
            clic a esta notificación, ambos desplegarán el chat.
          </p>
        ),
      });
  }, [isOnline]);

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (event.altKey && event.key.toLowerCase() === "l")
        if (!currentModal)
          dispatch({
            type: actionTypes.setCurrentModal,
            payload: (
              <Login
                {...{
                  onCloseSession: () =>
                    dispatch({
                      type: actionTypes.setCurrentModal,
                      payload: null,
                    }),
                }}
              />
            ),
          });
        else {
          dispatch({
            type: actionTypes.setCurrentModal,
            payload: null,
          });
        }
      if (event.altKey && event.key.toLowerCase() === "l") {
        !token &&
          setCurrentModal(
            <Login {...{ onLogged: () => setCurrentModal(null) }} />
          );
        token && router("/profile");
      }
      if (event.altKey && event.key.toLowerCase() === "h") router("/");
    },
    [currentModal]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  const { pages }: any = content;

  const InConstruction = ({}: any) => (
    <div style={{ height: "100vh" }}>
      <Modal
        {...{
          over: false,
          showCloseButton: false,
        }}
      >
        <img
          alt="work restrictional signal"
          src={
            "https://cdn.pixabay.com/photo/2017/10/26/17/51/under-construction-2891888_1280.jpg"
          }
        />
      </Modal>
    </div>
  );

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Carlos Muñoz Gachancipá</title>
      </Helmet>
      <div className={styles.header}>
        <Navigation
          pages={pages[currentLang]}
        ></Navigation>
      </div>
      <div className={styles.content}>
        <Memo>
          <Router>
            <LazyComponent
              fallback={
                <CubeGridLoader style={{ width: "100%", height: "100vh" }} />
              }
              Component={lazyLoad(() => import("../pages/Home"), "Home")}
              path="/"
            />
            <LazyComponent
              fallback={
                <CubeGridLoader style={{ width: "100%", height: "100vh" }} />
              }
              Component={lazyLoad(() => import("../pages/Home"), "Home")}
              path="home"
            />
            <LazyComponent
              Component={lazyLoad(() => import("../pages/Profile"), "Profile")}
              path="profile"
              {...{ clearAuth }}
            />
            <LazyComponent
              fallback={
                <CubeGridLoader style={{ width: "100%", height: "100vh" }} />
              }
              Component={lazyLoad(
                () => import("../pages/Projects"),
                "Projects"
              )}
              path="projects"
            />
            <LazyComponent
              fallback={
                <CubeGridLoader style={{ width: "100%", height: "100vh" }} />
              }
              Component={lazyLoad(
                () => import("../pages/Certificates"),
                "Certificates"
              )}
              path="certificates"
            />
            <LazyComponent
              fallback={
                <CubeGridLoader style={{ width: "100%", height: "100vh" }} />
              }
              Component={lazyLoad(() => import("../pages/About"), "About")}
              path="about"
            />
          </Router>
        </Memo>
        <div className={styles.live_chat}>
          <button
            className={`
            ${styles.chat_button} 
            ${isOnline ? styles.online : ""} 
            ${showChat ? styles.hidden : ""}`}
            onClick={toggleShowChat}
          >
            <i
              className={`fa-regular fa-comment-dots  ${
                isOnline ? styles.online : ""
              }`}
            ></i>
            <span className={`${isOnline ? styles.online : ""}`}>
              {isOnline ? "online" : "offline"}
            </span>
          </button>
          <div className={`${styles.chat_container} `}>
            <div className={showChat ? styles.visible : ""}>
              <button
                className={"fa-solid fa-caret-right"}
                onClick={toggleShowChat}
              ></button>
              <LiveChat></LiveChat>
            </div>
          </div>
        </div>
      </div>
      <Modal
        {...{
          active: false,
          injected: currentModal,
          setInjected: setCurrentModal,
          over: !false,
        }}
      />
      <Footer></Footer>
    </>
  );
}
