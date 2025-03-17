import styles from "./styles.module.css";
import Navigation from "../components/Navigation";
import { Login } from "../components/Login";
import { useStateValue } from "../context";
import { useApp } from "../hooks/useApp";
import { useToggle } from "../hooks/useToggle";
import { Modal } from "../components/Modal";
import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Router } from "../components/Router";
import { Footer } from "../components/Footer";
import { LiveChat } from "../components/LiveChat";
import content from "../mocks/content.json";
import { URL_API } from "../services";
import { lazyLoad, LazyComponent } from "../components/LazyComponent";
import { CubeGridLoader } from "../components/CubeGridLoader";
import { Memo } from "../components/Memo";
import { AppBackground } from "../components/AppBackground";
import { ScrollToTop } from "../components/ScrollToTop";

type liveChatButtonProps = {
  isOnline: boolean;
  showChat: boolean;
  toggleShowChat: () => void;
};
const LiveChatButton = ({
  isOnline,
  showChat,
  toggleShowChat,
}: liveChatButtonProps) => (
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
        {isOnline ? "Hi, I'm online" : "I'm currently offline"}
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
);
export function App() {
  const { clearAuth } = useApp();
  const router = useNavigate();
  const [{ language, isOnline, token }, dispatch]: any = useStateValue();
  // console.log({ token });
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
      .then((response) => dispatch({ isOnline: response }));
  }, []);

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (event.altKey && event.key.toLowerCase() === "l")
        if (!currentModal)
          dispatch({
            currentModal: (
              <Login
                {...{
                  onCloseSession: () => dispatch({ currentModal: null }),
                }}
              />
            ),
          });
        else {
          dispatch({ currentModal: null });
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

  const { navIndexes }: any = content;
  const loader = <CubeGridLoader style={{ width: "100%", height: "100vh" }} />;

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Carlos Muñoz Gachancipá</title>
      </Helmet>
      <div className={styles.header}>
        <Navigation pages={navIndexes[language]}></Navigation>
      </div>
      <div className={styles.content}>
        <ScrollToTop />
        <Memo>
          <AppBackground />
        </Memo>
        <Memo>
          <Router>
            <LazyComponent
              fallback={loader}
              Component={lazyLoad(
                () => import("../pages/Projects"),
                "Projects"
              )}
              path="projects"
            />
            <LazyComponent
              fallback={loader}
              Component={lazyLoad(() => import("../pages/Home"), "Home")}
              path="/"
            />
            <LazyComponent
              fallback={loader}
              Component={lazyLoad(() => import("../pages/Home"), "Home")}
              path="home"
            />
            <LazyComponent
              Component={lazyLoad(() => import("../pages/Profile"), "Profile")}
              path="profile"
              {...{ clearAuth }}
            />
            <LazyComponent
              fallback={loader}
              Component={lazyLoad(
                () => import("../pages/Portfolio"),
                "Portfolio"
              )}
              path="portfolio"
            />
            <LazyComponent
              fallback={loader}
              Component={lazyLoad(
                () => import("../pages/Certificates"),
                "Certificates"
              )}
              path="certificates"
            />
            <LazyComponent
              fallback={loader}
              Component={lazyLoad(() => import("../pages/About"), "About")}
              path="about"
            />
            <LazyComponent
              fallback={loader}
              Component={lazyLoad(
                () => import("../pages/Solutions"),
                "Solutions"
              )}
              path="solutions"
            />
          </Router>
        </Memo>
        {/* <LiveChatButton {...{ isOnline, showChat, toggleShowChat }} /> */}
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
