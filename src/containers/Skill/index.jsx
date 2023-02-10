import {
  Content,
  Container,
  InnerContainer,
  Title,
  Image,
  Dashboard,
  HideButton,
  ButtonsSection,
  Button,
  Main,
} from "./styles";
import { useNearScreen } from "../../hooks/useNearScreen";
import { labelCases } from "../../utils";
import { useEffect, useState } from "react";
import { useSwitch } from "../../hooks/useSwitch";
import { DefineSchema } from "../../components/DefineSchema";
import { runButtonBehavior } from "../../utils";
import { runRequest } from "../../services/runRequest";
import { headers } from "../../services/configs";

export function Skill({
  state,
  initialState,
  updateState,
  index,
  refreshRefs,
}) {
  const [show, ref] = useNearScreen(false, refreshRefs);
  const requestHeaders = headers();
  const [beingEdited, switchBeingEdited] = useSwitch(false, true);
  const [skill, setSkill] = useState(initialState);
  const { uuid, name, image, description, tags } = skill;

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
      if (parsedSchema[0][attr] !== skill[attr])
        toUpdate[attr] = parsedSchema[0][attr];
    }
    runRequest({
      setData: (data) => {
        setSkill({ ...data });
        updateState(({ state, setElements }) => {
          const newSkills = [...state.skills];
          newSkills.splice(
            newSkills.findIndex((s) => s.uuid === data.uuid),
            1,
            data
          );
          setElements(newSkills.map((s) => s.name));
        });
      },
      setError,
      setLoading,
    }).patch(
      `skills/${uuid}`,
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
    <Content ref={ref} reverse={index % 2 === 0} id={labelCases(name).LS}>
      {!beingEdited ? (
        <Main>
          <Title>{name}</Title>
          <Container reverse={index % 2 === 0}>
            <InnerContainer className="image">
              <Image src={image} />
            </InnerContainer>
            <InnerContainer reverse={index % 2 === 0} className="description">
              {description}
            </InnerContainer>
          </Container>
        </Main>
      ) : (
        <DefineSchema
          {...{
            title: `Update ${name}`,
            baseSchema: {
              name,
              description,
              image,
              tags,
            },
            nonOptionals: ["name", "description", "image", "tags"],
            highOrderCallback: (params) => setOnClickHandler(params),
            buttons: [],
          }}
        />
      )}
      <Dashboard id="skill-dashboard">
        <HideButton
          className="fa-solid fa-caret-down"
          onClick={() => console.log("DOWN!")}
        />
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
    </Content>
  );
}
