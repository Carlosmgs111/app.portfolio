import styles from "./styles.module.css";
import Navigation from "../components/Navigation";
import { Login } from "../components/Login";
import { useStateValue } from "../contexts/context";
import { useApp } from "../hooks/useApp";
import { useToggle } from "../hooks/useToggle";
import { Home, Projects, Certifications, Profile } from "../pages";
import { Modal } from "../components/Modal";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Router } from "../components/Router";
import { Footer } from "../components/Footer";
import { LiveChat } from "../components/LiveChat";
import content from "../db/content.json";
import { URL_API } from "../services";
import { actionTypes } from "../";

export function App() {
  const { clearAuth } = useApp();
  const [{ currentLang, isOnline }, dispatch] = useStateValue();
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
          login={{
            to: "profile",
            onClick: (e: any) => {
              e.preventDefault();
              setCurrentModal(
                <Login {...{ onLogged: () => setCurrentModal(null) }} />
              );
            },
          }}
        ></Navigation>
      </div>
      <div className={styles.content}>
        <Router>
          <Home path="/" />
          <Home path="home" />
          <Profile path="profile" {...{ clearAuth }} />
          <Projects path="projects" />
          <Certifications path="certifications" />
          <InConstruction path="blog" />
        </Router>
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
