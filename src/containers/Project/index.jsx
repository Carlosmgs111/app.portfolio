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
import {
  DefineSchema,
  getOnClickPack,
} from "../../components/DefineSchema";
import { useNearScreen } from "../../hooks/useNearScreen";
import { useSwitch } from "../../hooks/useSwitch";
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
  const [beingEdited, switchBeingEdited] = useSwitch(false, true);
  const [project, setProject] = useState(initialState);
  const { uuid, name, images, descriptions, uri, version, buildedBy } = project;
  const { token, username } = getContextValue(CONTEXTS.Global);

  useEffect(() => {}, [show, ref]);

  // ? 2️⃣ callback to be passed as parameter to setup function
  const defineSchemaCallback = (params) => {
    const { setError, setLoading, parsedSchema, reset } = params;
    const toUpdate = {};
    for (var attr in parsedSchema[0]) {
      if (parsedSchema[0][attr] !== project[attr])
        toUpdate[attr] = parsedSchema[0][attr];
    }
    runRequest({
      setData: (data) => {
        setProject({ ...data });
        updateState(({ state, setElements }) => {
          const newProjects = [...state.projects];
          newProjects.splice(
            newProjects.findIndex((c) => c.uuid === data.uuid),
            1,
            data
          );
          setElements(newProjects.map((p) => p.name));
        });
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

  // ? 3️⃣ function to set callback
  const [highOrderCallback, OnClickHandler] =
    getOnClickPack(defineSchemaCallback);

  const onClick = (e) => {
    const behaviors = {
      primary: () => {
        beingEdited
          ? OnClickHandler()
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
