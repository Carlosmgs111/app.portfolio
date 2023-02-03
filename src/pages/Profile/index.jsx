import { Page } from "../../components/Page";
import { Banner } from "../../components/Banner";
import { MultiSidebar } from "../../components/Sidebars/MultiSidebar";
import {
  PanelSidebar,
  innerItems,
} from "../../components/Sidebars/PanelSidebar";
import { getContext, CONTEXTS } from "../../contexts";
import { useNavigate } from "react-router-dom";

export function Profile({ clearAuth }) {
  const [{ useStateValue }, ACTIONS] = getContext(CONTEXTS.Global);
  const [{ token, loading: globalLoading, username }, dispatch] =
    useStateValue();

  const navigate = useNavigate();
  const panelSidebarItems = [
    {
      innerItem: innerItems.InnerItem,
      className: "fa-solid fa-building-columns",
      content: "Ver Mis Estados",
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
          "background-image":
            "url('https://i.pinimg.com/originals/89/2c/e7/892ce71c1c9d8fc3ff802049ac854f40.jpg')",
        }}
      >
        {username}
      </Banner>
      <MultiSidebar
        {...{
          sidebars,
        }}
      />
    </Page>
  );
}
