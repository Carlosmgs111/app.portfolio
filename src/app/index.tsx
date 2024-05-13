import styles from "./styles.module.css";
import Navigation from "../components/Navigation";
import { Login } from "../components/Login";
import { useStateValue } from "../contexts/context";
import { useApp } from "../hooks/useApp";
import { Home, Projects, Certifications, Profile } from "../pages";
import { Modal } from "../components/Modal";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Router } from "../components/Router";

export function App() {
  const { clearAuth } = useApp();
  const [{ token, avatar, searchedUsername, currentLang }] = useStateValue();
  const [showFixed, setShowFixed] = useState(false);
  const [currentModal, setCurrentModal]: any = useState(null);

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
        to: "projects",
      },
      {
        label: "Certificados",
        to: "certifications",
      },
      {
        label: "Blog",
        to: "blog",
      },
    ],
    en: [
      {
        label: "Projects",
        to: "projects",
      },
      {
        label: "Certifications",
        to: "certifications",
      },
      {
        label: "Blog",
        to: "blog",
      },
    ],
  };

  const InConstruction = ({}: any) => (
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
