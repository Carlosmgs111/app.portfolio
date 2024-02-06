import {
  Title,
  ProjectContainer,
  Image,
  ImagesContainer,
  Description,
  DescriptionsContainer,
  Dashboard,
  DashboardTitle,
  ButtonsSection,
  Button,
} from "./styles";
import { DefineSchema, getHOCAndTrigger } from "../../components/DefineSchema";
import { useNearScreen } from "../../hooks/useNearScreen";
import { useToggle } from "../../hooks/useToggle";
import { labelCases } from "../../utils";
import { useEffect, useState } from "react";
import { runButtonBehavior } from "../../utils";
import { runRequest } from "../../services/runRequest";
import { headers } from "../../services/configs";
import { getContextValue, CONTEXTS } from "../../contexts";

export const Project = ({
  even,
  refreshRefs,
  initialState,
  updateState,
  setCurrentModal,
}) => {
  const requestHeaders = headers();
  const [show, ref] = useNearScreen(false, refreshRefs);
  const [beingEdited, switchBeingEdited] = useToggle(false, true);
  const [project, setProject] = useState(initialState);
  const { uuid, name, images, descriptions, uri, version, buildedBy } = project;
  const { token, username } = getContextValue(CONTEXTS.Global);

  useEffect(() => {}, [show, ref]);

  // ? 1️⃣ Define the callback to be passed as high order callback
  const updateCallback = (params) => {
    const { setError, setLoading, data, reset } = params;
    const toUpdate = {};
    for (var attr in data[0]) {
      if (data[0][attr] !== project[attr])
        toUpdate[attr] = data[0][attr];
    }
    runRequest({
      setData: ({ updated }) => {
        if (updated) {
          const projectUpdated = { ...project, ...data[0] };
          setProject({ ...projectUpdated });
          updateState(({ state, setElements }) => {
            const newProjects = [...state.projects];
            newProjects.splice(
              newProjects.findIndex((c) => c.uuid === projectUpdated.uuid),
              1,
              projectUpdated
            );
            setElements(newProjects.map((p) => p.name));
          });
        }
      },
      setError,
      setLoading,
    }).patch(
      `projects/${uuid}`,
      { ...toUpdate },
      {
        ...requestHeaders,
      }
    );
    reset();
    switchBeingEdited();
  };

  // ? 2️⃣ Function to obtain the provided callback as the high order callback to be passed to 
  // ? DefineSchema component as argument 'hightOrderCallback' and its respective trigger 
  const [highOrderCallback, HOCTrigger] = getHOCAndTrigger(updateCallback);

  const onClick = (e) => {
    const behaviors = {
      primary: () => {
        beingEdited
          ? HOCTrigger()
          : (() => {
              const result = window.confirm(
                `Are you sure you want to delete project ${name}`
              );
              result &&
                runRequest({
                  setData: (data) => {
                    updateState(({ setProjects, state, setElements }) => {
                      const newProjects = [...state.projects];
                      newProjects.splice(
                        newProjects.findIndex((c) => c.uuid === data.uuid),
                        1
                      );
                      setProjects(newProjects);
                      setElements(newProjects.map((p) => p.name));
                    });
                  },
                }).delete(`projects/${uuid}`, {
                  ...requestHeaders,
                });
            })();
      },
      secondary: switchBeingEdited,
    };
    runButtonBehavior(e, behaviors);
  };

  return (
    <ProjectContainer ref={ref} id={labelCases(name).LS} even={even}>
      {!beingEdited ? (
        <>
          <Title>{name}</Title>
          <ImagesContainer even={even}>
            {images.map((image, index) => (
              <Image
                key={index}
                src={image}
                big={
                  images.length >= 6 ? false : !(images.length > 2 && index > 0)
                }
                onClick={() => {
                  setCurrentModal(
                    <Image
                      zoomed={true}
                      src={image}
                      onClick={() => setCurrentModal(null)}
                    />
                  );
                }}
              />
            ))}
          </ImagesContainer>
          <DescriptionsContainer even={even}>
            {descriptions.map((description, index) => (
              <Description even={even} key={index}>
                {description}
              </Description>
            ))}
          </DescriptionsContainer>
        </>
      ) : (
        <DefineSchema
          {...{
            title: `Update ${name}`,
            baseSchema: {
              name,
              descriptions,
              images,
              uri,
              version,
            },
            nonOptionals: ["name", "descriptions", "images", "uri", "version"],
            highOrderCallback,
            buttons: [],
          }}
        />
      )}
      {token && buildedBy.includes(username) && (
        <Dashboard id="project-dashboard">
          <DashboardTitle>{name}</DashboardTitle>
          <ButtonsSection>
            <Button
              className={beingEdited ? "success" : "danger"}
              id={uuid}
              name="primary"
              onClick={onClick}
            >
              {beingEdited ? (uuid ? "Guardar" : "Crear") : "Eliminar"}
            </Button>
            <Button
              className={beingEdited ? "danger" : "secondary"}
              name="secondary"
              id={uuid}
              button="secondary"
              onClick={onClick}
            >
              {beingEdited ? (uuid ? "Cancelar" : "Limpiar") : "Editar"}
            </Button>
          </ButtonsSection>
        </Dashboard>
      )}
    </ProjectContainer>
  );
};
