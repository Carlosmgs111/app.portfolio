import { Header, Content, Footer, BannerStyle, Avatar } from "./styles";
import Navigation from "../components/Navigation";
import { Routes } from "react-router-dom";
import { Login } from "../components/Login";
import { getContext, CONTEXTS } from "../contexts";
import { RoutesFactory, NavigationItemsFactory } from "../pages";
import { useApp } from "../hooks/useApp";
import { Home } from "../pages/Home";
import { Skills } from "../pages/Skills";
import { Projects } from "../pages/Projects";
import { Certifications } from "../pages/Certifications";
import { Profile } from "../pages/Profile";
import { Modal } from "../components/Modal";
import { injectAttrsToReactElements } from "../utils";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function App() {
  const { clearAuth } = useApp();
  const [{ useStateValue }] = getContext(CONTEXTS.Global);
  const [
    { token, avatar, searchedUsername },
  ] = useStateValue();
  const [showFixed, setShowFixed] = useState(false);
  const [currentModal, setCurrentModal] = useState(null);
  // useScroll()

  useEffect(() => {
    const onScroll = (e) => {
      const newShowFixed = window.scrollY > 200;
      showFixed !== newShowFixed &&
        setTimeout(() => setShowFixed(newShowFixed), 500); // ? delay effect 500 ms
    };
    document.addEventListener("scroll", onScroll);
  }, [showFixed]);

  const pages = [
    {
      label: "proyectos",
      path: `projects${searchedUsername && `?username=${searchedUsername}`}`,
    },
    {
      label: "Certificados",
      path: `certifications${
        searchedUsername && `?username=${searchedUsername}`
      }`,
    },
    {
      label: "Habilidades",
      path: `skills${searchedUsername && `?username=${searchedUsername}`}`,
    },
    "blog",
  ];

  if (token)
    pages.push({
      item: <Avatar id="nonMark" src={avatar} />,
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
              "https://www.dcs.mx/Manual%20de%20usuario/tutoriales/images/5.jpg"
            }
          />
        ),
      }}
    />
  );

  return (
    <>
      <ToastContainer />
      <Header showFixed={showFixed}>
        <Navigation
          banner={{
            title: <BannerStyle>Blogfolio</BannerStyle>,
            to: "/",
          }}
        >
          {NavigationItemsFactory({
            pages,
            login: {
              label: () => <span>Login</span>,
              onClick: (e) => {
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
        {/* <h1 id="box">°</h1> */}
      </Header>
      <Content>
        {/* <ContentBanner></ContentBanner> */}
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
          {RoutesFactory({
            root: "skills",
            element: <Skills />,
          })}
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
      </Content>
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
