import { Page } from "../../components/Page";
import { Banner } from "../../components/Banner";
import { MultiSidebar } from "../../components/Sidebars/MultiSidebar";
import {
  PanelSidebar,
  innerItems,
} from "../../components/Sidebars/PanelSidebar";
import { MyState, Settings, ProfileHome } from "./sections";
import { getContext, CONTEXTS } from "../../contexts";
import { useNavigate } from "react-router-dom";
import { Container, MainContainer } from "./styles";
import { useState } from "react";

export function Profile({ clearAuth }) {
  const [{ useStateValue }, ACTIONS] = getContext(CONTEXTS.Global);
  const [
    {
      token,
      loading: globalLoading,
      username,
      email,
      createdAt,
      privilege,
      avatar,
    },
    dispatch,
  ] = useStateValue();
  const [currentContent, setCurrentContent] = useState(<ProfileHome />);

  const navigate = useNavigate();
  const panelSidebarItems = [
    {
      innerItem: innerItems.InnerItem,
      className: "fa-solid fa-house-user",
      content: "Principal",
      onClick: () => setCurrentContent(<ProfileHome />),
    },
    { innerItem: innerItems.Separator },
    {
      innerItem: innerItems.InnerItem,
      className: "fa-solid fa-building-columns",
      content: "Ver Mi Estado",
      onClick: () =>
        setCurrentContent(
          <MyState {...{ username, email, createdAt, privilege }} />
        ),
    },
    {
      innerItem: innerItems.InnerItem,
      className: "fa-solid fa-wrench",
      content: "Configurar Mi Cuenta",
      onClick: () => setCurrentContent(<Settings {...{ avatar }} />),
    },
    { innerItem: innerItems.Separator },
    {
      innerItem: innerItems.InnerItem,
      className: "fa-solid fa-right-from-bracket",
      content: "Cerrar Sesion",
      onClick: () => {
        if (window.confirm("Are you sure you want logout?")) {
          clearAuth();
          dispatch({ type: ACTIONS.reset });
          navigate("/");
        }
      },
    },
  ];

  const sidebars = [
    <PanelSidebar {...{ items: panelSidebarItems, expanded: true }} />,
  ];
  return (
    <Page>
      <Banner
        config={{
          "background-image": `url('${avatar}')`,
        }}
      >
        {username}
      </Banner>
      <Container>
        <MultiSidebar
          {...{
            sidebars,
            float: false,
          }}
        />
        <MainContainer>{currentContent}</MainContainer>
      </Container>
    </Page>
  );
}
