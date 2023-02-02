import { Container, Main } from "./styles";
import { Banner } from "../../components/Banner";
import { Skill } from "../../containers/Skill";
import { MultiSidebar } from "../../components/Sidebars/MultiSidebar";
import { PanelSidebar } from "../../components/Sidebars/PanelSidebar";
import { useTrackSidebar } from "../../hooks/useTrackSidebar";
import { getContextValue, CONTEXTS } from "../../contexts";
import { useEffect } from "react";

export function Skills() {
  const { token } = getContextValue(CONTEXTS.Global);
  const [TrackSidebar, setElements, refreshRefs] = useTrackSidebar();

  const skills = [
    {
      title: "Hexagonal Architecture",
      image:
        "https://herbertograca.files.wordpress.com/2018/11/100-explicit-architecture-svg.png",
      description: "Desarrollo de proyectos backend con arquitectura Hexagonal",
    },
    {
      title: "Clean Architecture",
      image:
        "https://velog.velcdn.com/images%2Fitssweetrain%2Fpost%2F4aa1d07d-9e43-4316-80ef-109c0e090111%2Fimage.png",
      description: "Desarrollo de proyectos backend con arquitectura Limpia",
    },
    {
      title: "Desarrollo con styled components",
      image: "https://styled-components.com/atom.png",
      description: "Desarrollo de componentes con styled components",
    },
  ];

  useEffect(() => {
    setElements([...skills.map((skill) => skill.title)]);
  }, [token]);

  const sidebars = [TrackSidebar, <PanelSidebar />];
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <Banner
        {...{
          config: {
            "background-image":
              "url('https://img.freepik.com/vector-premium/plantilla-diseno-banner-fondo-abstracto-formas-geometricas-patrones-hexagonales-pequenos-puntos-ilustracion-vectorial-diseno-tecnologia-o-ciencia_73749-706.jpg?w=2000')",
          },
        }}
      >
        Skills
      </Banner>
      <MultiSidebar {...{ sidebars }} />
      <Container>
        <Main>
          {skills.map((skill, index) => (
            <Skill {...{ ...skill, index, refreshRefs }} />
          ))}
        </Main>
      </Container>
    </div>
  );
}
