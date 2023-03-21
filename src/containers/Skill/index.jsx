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
import { DefineSchema, getHOCAndTrigger } from "../../components/DefineSchema";
import { runButtonBehavior } from "../../utils";
import { runRequest } from "../../services/runRequest";
import { headers } from "../../services/configs";
import { getContextValue, CONTEXTS } from "../../contexts";

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
  const { uuid, name, image, description, tags, dominatedBy } = skill;
  const { token, username } = getContextValue(CONTEXTS.Global);

  useEffect(() => {}, [show, ref]);

  // ? 1️⃣ Define the callback to be passed as high order callback
  const updateHOC = (params) => {
    const { setError, setLoading, data, reset } = params;
    const toUpdate = {};
    for (var attr in data[0]) {
      if (data[0][attr] !== skill[attr])
        toUpdate[attr] = data[0][attr];
    }
    runRequest({
      setData: ({ updated }) => {
        if (updated) {
          const skillUpdated = { ...skill, ...data[0] };
          setSkill({ ...skillUpdated });
          updateState(({ state, setElements }) => {
            const newSkills = [...state.skills];
            newSkills.splice(
              newSkills.findIndex((s) => s.uuid === skillUpdated.uuid),
              1,
              skillUpdated
            );
            setElements(newSkills.map((s) => s.name));
          });
        }
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

  // ? 2️⃣ Function to obtain the provided callback as the high order callback to be passed to
  // ? DefineSchema component as argument 'hightOrderCallback' and its respective trigger
  const [highOrderCallback, HOCTrigger] = getHOCAndTrigger(updateHOC);

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
            highOrderCallback,
            buttons: [],
          }}
        />
      )}
      {token && dominatedBy.includes(username) && (
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
      )}
    </Content>
  );
}
