import { Header, Content, Footer, Banner, Icon } from "./styles";
import Navigation from "../components/Navigation";
import { Route, Routes, Router } from "react-router-dom";
import { Login } from "../components/Login";
import { getContext, CONTEXTS } from "../contexts";
import { RoutesFactory, NavigationItemsFactory } from "../utils";
import { useSwitch } from "../hooks/useSwitch";
import { useApp } from "../hooks/useApp";

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
                  <Icon className="fa-solid fa-right-from-bracket"></Icon>
                ) : (
                  <Icon className="fa-sharp fa-solid fa-right-to-bracket"></Icon>
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
        </Routes>
        <p style={{"font-size":"1.4rem"}}>Anim ex nostrud exercitation exercitation anim aliqua. Sit Lorem id
        laborum proident eu ad Lorem culpa. Occaecat ipsum exercitation
        consequat aute ullamco. Commodo enim voluptate aliqua pariatur ipsum
        tempor enim velit nisi. Officia ut adipisicing veniam enim esse aliqua
        minim Lorem esse amet ut elit ullamco et. Id reprehenderit cillum mollit
        qui esse. Do sint dolor sunt adipisicing est eu tempor proident sunt
        commodo ipsum occaecat tempor incididunt. Dolore consectetur nostrud
        sunt aliquip eiusmod velit. Irure mollit duis sint dolore. Aliqua quis
        amet est minim occaecat ipsum laboris do laboris minim nostrud anim. Qui
        adipisicing velit cupidatat adipisicing Lorem. Aliquip duis elit
        deserunt ad. Aute id ut tempor duis dolor anim.</p>
      </Content>
      <Footer></Footer>
    </>
  );
}
