import {
  Title,
  ProjectContainer,
  Image,
  ImagesContainer,
  Description,
  DescriptionsContainer,
  Dashboard,
  Button,
} from "./styles";
import { DefineSchema } from "../../components/DefineSchema";
import { useNearScreen } from "../../hooks/useNearScreen";
import { useSwitch } from "../../hooks/useSwitch";
import { labelCases } from "../../utils";
import { useEffect, useState } from "react";
import { runButtonBehavior } from "../../utils";
import { runRequest } from "../../services/runRequest";
import { headers } from "../../services/configs";

export const Project = ({ even, refreshRefs, initialState, updateState }) => {
  const requestHeaders = headers();
  const [show, ref] = useNearScreen(false, refreshRefs);
  const [beingEdited, switchBeingEdited] = useSwitch(false, true);
  const [project, setProject] = useState(initialState);
  const { uuid, name, images, descriptions, uri, version } = project;

  useEffect(() => {}, [show, ref]);

  // ? 1️⃣ closure function that return function that set the callback provided
  const onClickHandler = (cb) => {
    let onClickHandlerCallback = null;
    return [
      (params) => (onClickHandlerCallback = cb(params)),
      () => onClickHandlerCallback,
    ];
  };

  // ? 2️⃣ callback to be passed as parameter to setup function
  const defineSchemaCallback = (params) => () => {
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
  const [setOnClickHandler, getOnClickHandler] =
    onClickHandler(defineSchemaCallback);

  const onClick = (e) => {
    const onClickHandlerCallback = getOnClickHandler();
    const behaviors = {
      primary: () => {
        beingEdited
          ? onClickHandlerCallback()
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
                        newProjects.findIndex(
                          (c) => c.uuid === data.uuid
                        ),
                        1,
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
              <Image key={index} src={image} />
            ))}
          </ImagesContainer>
          <DescriptionsContainer even={even}>
            {descriptions.map((description, index) => (
              <Description key={index}>{description}</Description>
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
            highOrderCallback: (params) => setOnClickHandler(params),
            buttons: [],
          }}
        />
      )}
      <Dashboard id="project-dashboard">
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
      </Dashboard>
    </ProjectContainer>
  );
};
