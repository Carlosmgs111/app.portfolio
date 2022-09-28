import { Header, Content, Footer, Banner, Icon } from "./styles";
import Navigation from "../components/Navigation";
import { Route, Routes, Router } from "react-router-dom";
import { Login } from "../components/Login";
import { getContext, CONTEXTS } from "../contexts";
import { RoutesFactory, NavigationItemsFactory } from "../utils";
import { useSwitch } from "../hooks/useSwitch";
import { useApp } from "../hooks/useApp";
import {Home} from "../pages/Home"

export function App() {
  const {  clearAuth } = useApp();
  const [{ useStateValue }, ACTIONS] = getContext(CONTEXTS.Global);
  const [{ token, loading: globalLoading }, dispatch] = useStateValue();
  const [showLogin, switchShowLogin] = useSwitch(false, true);
  return (
    <>{showLogin && (
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
            pages: [
              "profile",
              "projects",
              "certifications",
              "organizations",
              "blog",
            ],
            login: {
              label: () =>
                token ? (
                  <Icon state={true} className="fa-solid fa-right-from-bracket"></Icon>
                ) : (
                  <Icon state={false} className="fa-sharp fa-solid fa-right-to-bracket"></Icon>
                ),
              onClick: (e) => {
                e.preventDefault();
                switchShowLogin();
                if (token) {
                  clearAuth();
                  dispatch({ type: ACTIONS.reset });
                }
              },
            },
          })}
        </Navigation>
      </Header>
      <Content>
        <Routes>
          {RoutesFactory({
            root: "profile",
            parameters: ["section"],
            subDomains: ["reset_password/:token"],
            element: <div>Profile</div>,
          })}
          {RoutesFactory({
            root: "",
            parameters: ["section"],
            subDomains: ["reset_password/:token"],
            element: <Home/>,
          })}
        </Routes>
      </Content>
      <Footer></Footer>
    </>
  );
}
