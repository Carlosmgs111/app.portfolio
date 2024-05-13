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
import { Helmet } from "react-helmet";
import path from "path";

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
        path: "projects",
      },
      {
        label: "Certificados",
        path: "certifications",
      },
      "Blog",
    ],
    en: [
      {
        label: "Projects",
        path: "projects",
      },
      {
        label: "Certifications",
        path: "certifications",
      },
      "Blog",
    ],
  };

  // if (token)
  //   pages[currentLang].push({
  //     item: (
  //       <img
  //         className={styles.avatar}
  //         id="nonMark"
  //         src={avatar}
  //         alt="Profile user avatar"
  //       />
  //     ),
  //     path: "profile",
  //   });

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
      <Helmet>
        <meta charSet="utf-8" />
        <title>Carlos Muñoz</title>
      </Helmet>
      <div className={styles.header}>
        <Navigation
          pages={[
            { label: "Certifications", to: "certifications" },
            { label: "Projects", to: "projects" },
          ]}
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
