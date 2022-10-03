import { Header, Content, Footer, Banner, Icon } from "./styles";
import Navigation from "../components/Navigation";
import { Route, Routes, Router } from "react-router-dom";
import { Login } from "../components/Login";
import { getContext, CONTEXTS } from "../contexts";
import { RoutesFactory, NavigationItemsFactory } from "../utils";
import { useSwitch } from "../hooks/useSwitch";
import { useApp } from "../hooks/useApp";
import { Home } from "../pages/Home";
import { Certifications } from "../pages/Certifications";

export function App() {
  const { clearAuth } = useApp();
  const [{ useStateValue }, ACTIONS] = getContext(CONTEXTS.Global);
  const [{ token, loading: globalLoading }, dispatch] = useStateValue();
  const [showLogin, switchShowLogin] = useSwitch(false, true);

  const pages = [
    "projects",
    "skills",
    "certifications",
    "organizations",
    "blog",
  ];

  if (token) pages.unshift("profile");

  return (
    <>
      {showLogin && (
        <Login
          {...{
            embedButton: (
              <i
                type="button"
                onClick={switchShowLogin}
                className="far fa-times-circle embed-button"
              />
            ),
          }}
        />
      )}
      <Header>
        <Navigation
          className="navbar"
          banner={{ title: <Banner>Portfolio</Banner>, to: "/" }}
        >
          {NavigationItemsFactory({
            pages,
            login: {
              label: () => (
                <Icon
                  state={Boolean(token)}
                  className="fa-solid fa-fingerprint"
                ></Icon>
              ),
              onClick: (e) => {
                e.preventDefault();
                switchShowLogin();
                if (token) {
                  if (window.confirm("Are you sure you want logout?")) {
                    clearAuth();
                    dispatch({ type: ACTIONS.reset });
                  }
                }
              },
            },
          })}
        </Navigation>
      </Header>
      <Content>
        <Routes>
          {RoutesFactory({
            root: "",
            element: <Home />,
          })}
          {RoutesFactory({
            root: "profile",
            element: <h1>Profile</h1>,
          })}
          {RoutesFactory({
            root: "projects",
            element: <h1>Projects</h1>,
          })}
          {RoutesFactory({
            root: "skills",
            element: <h1>Skills</h1>,
          })}
          {RoutesFactory({
            root: "certifications",
            element: <Certifications />,
          })}
          {RoutesFactory({
            root: "organizations",
            element: <h1>Organizations</h1>,
          })}
          {RoutesFactory({
            root: "blog",
            element: <h1>Blog</h1>,
          })}
        </Routes>
      </Content>
      <Footer></Footer>
    </>
  );
}
