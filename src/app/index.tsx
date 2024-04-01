import styles from "./styles.module.css";
import Navigation from "../components/Navigation";
import { Routes } from "react-router-dom";
import { Login } from "../components/Login";
import { getContext, CONTEXTS } from "../contexts";
import { RoutesFactory, NavigationItemsFactory } from "../pages/routers";
import { useApp } from "../hooks/useApp";
import { Home, Skills, Projects, Certifications, Profile } from "../pages";
import { Modal } from "../components/Modal";
import { injectAttrsToReactElements } from "../utils";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function App() {
  const { clearAuth } = useApp();
  const [{ useStateValue }] = getContext(CONTEXTS.Global);
  const [{ token, avatar, searchedUsername, currentLang }] = useStateValue();
  const [showFixed, setShowFixed] = useState(false);
  const [currentModal, setCurrentModal]: any = useState(null);
  // useScroll()

  useEffect(() => {
    const onScroll = (e: any) => {
      const newShowFixed = window.scrollY > 200;
      showFixed !== newShowFixed &&
        setTimeout(() => setShowFixed(newShowFixed), 500); // ? delay effect 500 ms
    };
    document.addEventListener("scroll", onScroll);
  }, [showFixed]);

  const pages: any = {
    es: [
      {
        label: "Proyectos",
        path: `projects${searchedUsername && `?username=${searchedUsername}`}`,
      },
      {
        label: "Certificados",
        path: `certifications${
          searchedUsername && `?username=${searchedUsername}`
        }`,
      },
      // {
      //   label: "Habilidades",
      //   path: `skills${searchedUsername && `?username=${searchedUsername}`}`,
      // },
      "Blog",
    ],
    en: [
      {
        label: "Projects",
        path: `projects${searchedUsername && `?username=${searchedUsername}`}`,
      },
      {
        label: "Certifications",
        path: `certifications${
          searchedUsername && `?username=${searchedUsername}`
        }`,
      },
      // {
      //   label: "Skills",
      //   path: `skills${searchedUsername && `?username=${searchedUsername}`}`,
      // },
      "Blog",
    ],
  };

  if (token)
    pages[currentLang].push({
      item: (
        <img
          className={styles.avatar}
          id="nonMark"
          src={avatar}
          alt="Profile user avatar"
        />
      ),
      path: "profile",
    });

  const inConstruction = (
    <Modal
      {...{
        over: false,
        showCloseButton: false,
        injected: (
          <img
            alt="work restrictional signal"
            src={
              "https://cdn.pixabay.com/photo/2017/10/26/17/51/under-construction-2891888_1280.jpg"
            }
          />
        ),
      }}
    />
  );

  return (
    <>
      <ToastContainer />
      <div className={styles.header}>
        <Navigation
          banner={{
            title: <div className={styles.banner}>Blogfolio</div>,
            to: "/",
          }}
        >
          {NavigationItemsFactory({
            pages: pages[currentLang],
            login: {
              label: () => <span>Login</span>,
              onClick: (e: any) => {
                e.preventDefault();
                // switchShowLogin();
                setCurrentModal(
                  <Login {...{ onLogged: () => setCurrentModal(null) }} />
                );
              },
              hidden: Boolean(token),
            },
          }).map((page, index) =>
            injectAttrsToReactElements([page], { key: index })
          )}
        </Navigation>
      </div>
      <div className={styles.content}>
        <Routes>
          {RoutesFactory({
            root: "",
            element: <Home />,
          })}
          {RoutesFactory({
            root: "profile",
            element: <Profile {...{ clearAuth }} />,
          })}
          {RoutesFactory({
            root: "projects",
            element: <Projects />,
          })}
          {/* {RoutesFactory({
            root: "skills",
            element: <Skills />,
          })} */}
          {RoutesFactory({
            root: "certifications",
            subDomains: ["uuid", "title"],
            element: <Certifications />,
          })}
          {RoutesFactory({
            root: "blog",
            element: inConstruction,
          })}
        </Routes>
      </div>
      <Modal
        {...{
          active: false,
          injected: currentModal,
          setInjected: setCurrentModal,
          over: !false,
        }}
      />
      <footer className={styles.footer}></footer>
    </>
  );
}
