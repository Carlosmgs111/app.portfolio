import styles from "./styles.module.css";
import { useNearScreen } from "../../hooks/useNearScreen";
import { labelCases } from "../../utils";
import { useEffect, useState } from "react";
import { useToggle } from "../../hooks/useToggle";
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
  const [beingEdited, switchBeingEdited] = useToggle(false, true);
  const [skill, setSkill] = useState(initialState);
  const { uuid, name, image, description, tags, dominatedBy } = skill;
  const { token, username } = getContextValue(CONTEXTS.Global);

  useEffect(() => {}, [show, ref]);

  // ? 1️⃣ Define the callback to be passed as high order callback
  const updateCallback = (params) => {
    console.log(
      "🚀 ~ file: index.jsx:41 ~ updateCallback ~ updateCallback:",
      updateCallback
    );
    const { setError, setLoading, data, reset } = params;
    const toUpdate = {};
    for (var attr in data[0]) {
      if (data[0][attr] !== skill[attr]) toUpdate[attr] = data[0][attr];
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
    <div
      className={styles.content.concat(
        " ",
        index % 2 === 0 ? styles.reversed : ""
      )}
      ref={ref}
      id={labelCases(name).LS}
    >
      {!beingEdited ? (
        <div className={styles.main}>
          <h3 className={styles.title}>{name}</h3>
          <div
            className={styles.container.concat(
              " ",
              index % 2 === 0 ? styles.reversed : ""
            )}
          >
            <div className={styles.inner_container.concat(" ", styles.image)}>
              <img className={styles.image} src={image} alt="" />
            </div>
            <div
              className={styles.inner_container.concat(
                " ",
                styles.description,
                " ",
                index % 2 === 0 ? styles.reversed : ""
              )}
            >
              {description}
            </div>
          </div>
        </div>
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
        <div className={styles.dashboard} id="skill-dashboard">
          <i
            className={`fa-solid fa-caret-down ${styles.hidden_button}`}
            onClick={() => console.log("DOWN!")}
          />
          <div className={styles.buttons_section}>
            <button
              className={styles.button.concat(
                " ",
                beingEdited ? styles.success : styles.danger
              )}
              id={uuid}
              name="primary"
              onClick={onClick}
            >
              {beingEdited ? (uuid ? "Guardar" : "Crear") : "Eliminar"}
            </button>
            <button
              className={styles.button.concat(
                " ",
                beingEdited ? styles.danger : styles.secondary
              )}
              name="secondary"
              id={uuid}
              button="secondary"
              onClick={onClick}
            >
              {beingEdited ? (uuid ? "Cancelar" : "Limpiar") : "Editar"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
