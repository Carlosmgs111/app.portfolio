import { Header, Content, Footer } from "./styles";
import Navigation from "../components/Navigation";
import { Route, Routes, Router } from "react-router-dom";
import { RoutesFactory, NavigationItemsFactory } from "../utils";

export function App() {
  const token = "";
  return (
    <>
      <Header>
        <Navigation className="navbar" banner={{title:<h1>Portfolio</h1>, to:"/"}}>
          {NavigationItemsFactory({
            pages: ["profile"],
             login: {
              label: () => (token ? "Logout" : "Login"),
              onClick: () => {
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
            element: <div></div>,
          })}
        </Routes>
      </Content>
      <Footer></Footer>
    </>
  );
}
