import { Page } from "../../components/Page";
import { Banner } from "../../components/Banner";
import { SidePanel } from "../../components/SidePanel";
import { PanelSidebar, innerItems } from "../../components/PanelSidebar";
import { MyState, Settings, ProfileHome, TestsSection } from "./sections";
import { useStateValue } from "../../context";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import { useState } from "react";
import { SocketService } from "../../services";

export function Profile({ clearAuth }: any) {
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
  ]: any = useStateValue();
  const [currentContent, setCurrentContent]: any = useState(
    //<Settings {...{ avatar }} />
    <TestsSection />
  );

  const navigate = useNavigate();
  const panelSidebarItems: any = [
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
      onClick: () => setCurrentContent(<Settings />),
    },
    { innerItem: innerItems.Separator },
    {
      innerItem: innerItems.InnerItem,
      className: "fa-solid fa-flask-vial",
      content: "Pruebas",
      onClick: () => setCurrentContent(<TestsSection />),
    },
    { innerItem: innerItems.Separator },
    {
      innerItem: innerItems.InnerItem,
      className: "fa-solid fa-right-from-bracket",
      content: "Cerrar Sesion",
      onClick: () => {
        if (window.confirm("Are you sure you want logout?")) {
          clearAuth();
          SocketService.sendMessage({
            core: { unregister: [{ id: SocketService.id }] },
          });
          navigate("/");
        }
      },
    },
  ];

  const sidebars: any = [
    <PanelSidebar {...{ items: panelSidebarItems, expanded: true }} />,
  ];
  return (
    <Page>
      <Banner
        customeMessage={false}
        {...{
          background: `url('${avatar}')`,
        }}
      >
        {username}
      </Banner>
      <div className={styles.container}>
        <SidePanel
          {...{
            sidebars,
          }}
        />
        <div className={styles.main_container}>{currentContent}</div>
      </div>
    </Page>
  );
}
