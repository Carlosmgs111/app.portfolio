import { useState, useEffect } from "react";
import { getContextValue, CONTEXTS } from "../../contexts";
import axios from "axios";
import { URL_API } from "../../services";
import { Project } from "../../containers/Project";
import { Container, MainContainer } from "./styles";
import { useTrackSidebar } from "../../hooks/useTrackSidebar";
import { MultiSidebar } from "../../components/Sidebars/MultiSidebar";
import {
  PanelSidebar,
  innerItems,
} from "../../components/Sidebars/PanelSidebar";
import { Banner } from "../../components/Banner";
import { Page } from "../../components/Page";
import { Modal } from "../../components/Modal";

export function Projects() {
  const { token } = getContextValue(CONTEXTS.Global);
  const [projects, setProjects] = useState([]);
  const [TrackSidebar, setElements, updateRefs] = useTrackSidebar();
  const [currentModal, setCurrentModal] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [projectSchema, setProjectSchema] = useState({
    name: "",
    emitedBy: "",
    // ? `{` symbol used for mark a select object controller
    "emitedBy{": [],
    emitedAt: new Date().getTime(),
    // ? `~` symbol used for mark a date object controller
    "emitedAt~": new Date().toISOString().slice(0, 10),
    image: "",
    url: "",
  });

  const sidebars = [
    TrackSidebar, // ? ⬅️ this is a rendered component, so we just put as a variable and it is not called
  ];

  if (token)
    sidebars.push(
      <PanelSidebar
        {...{
          id: "panel-sidebar",
          items: [
            {
              innerItem: innerItems.InnerItem,
              className: "fa-solid fa-plus",
              content: "Agregar Proyecto",
              onClick: () => {
                setCurrentModal(
                  <div style={{ position: "absolute", right: 0 }}>
                    <h1>Hola</h1>
                  </div>
                )
              },
            },
          ],
        }}
      />
    );

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await axios.get(`${URL_API}/projects`);
        setProjects([...data]);
        setElements([...data.map((project) => project.name)]);
      } catch (e) {
        setLoading(false);
        setError(e);
      }
    };
    fetchProjects();
    return () => {
      setProjects([]);
      updateRefs([]);
    };
  }, [token]);

  return (
    <Page>
      <Banner
        config={{
          "background-image":
            "url('https://arc-anglerfish-arc2-prod-infobae.s3.amazonaws.com/public/Y2RBROL56RCODAPA3AF2MWUCRU.jpg')",
        }}
      >
        Projects
      </Banner>
      <MultiSidebar
        {...{
          sidebars,
        }}
      />
      <Container>
        <MainContainer>
          {projects.map((project, index) => (
            <Project
              key={index}
              {...{ ...project, even: index % 2 === 0, updateRefs }}
            />
          ))}
        </MainContainer>
      </Container>
      <Modal
        {...{
          active: false,
          injected: currentModal,
          embedButton: (
            <i
              id="newNote"
              type="button"
              onClick={() => setCurrentModal(null)}
              className="far fa-times-circle embed-button"
            ></i>
          ),
        }}
      />
    </Page>
  );
}
