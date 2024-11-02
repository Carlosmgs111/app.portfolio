import styles from "./styles.module.css";
import { useNearScreen } from "../../hooks/useNearScreen";
import { useToggle } from "../../hooks/useToggle";
import { useState } from "react";
import { runButtonBehavior } from "../../utils";
import { runRequest } from "../../services/runRequest";
import { headers } from "../../services/configs";
import { getContextValue, CONTEXTS } from "../../contexts";
import { SVGIndexes } from "../../icons";
import { ProjectSkeleton } from "./Skeleton";
import { AsyncImage } from "loadable-image";
import { CubeGridLoader } from "../../components/CubeGridLoader";
import { Memo } from "../../components/Memo";
import {
  INPUT_TYPES,
  DefineForms,
  getHOCAndTrigger,
} from "../../components/DefineForms";
import { InfiniteCarousel } from "../../components/InfiniteCarousel";

export const Project = ({
  even,
  refreshRefs,
  initialState,
  updateState,
  setCurrentModal,
  stackOps,
  stateOps,
  kindOps,
}: any) => {
  const requestHeaders = headers();
  const [ref] = useNearScreen(false, refreshRefs);
  const [beingEdited, switchBeingEdited] = useToggle(false, true);
  const [project, setProject] = useState(initialState);
  const {
    uuid,
    name,
    images,
    descriptions,
    uri,
    codeUri,
    version,
    buildedBy,
    tags,
    state,
    stack,
    kind,
  } = project;
  const { token, username } = getContextValue(CONTEXTS.Global);
  const stateIcons: any = {
    developing: "fa-solid fa-arrows-spin",
    testing: "fa-solid fa-vial",
    builded: "fa-regular fa-square-check",
    deprecated: "fa-solid fa-ban",
  };
  const kindIcons: any = {
    test: "fa-solid fa-vial-circle-check",
    production: "fa-solid fa-rocket",
    development: "fa-solid fa-code",
    component: "fa-solid fa-puzzle-piece",
    project: "fa-solid fa-building-circle-check",
  };

  // ? 1️⃣ Define the callback to be passed as high order callback
  const updateCallback = (params: any) => {
    const { setError, setLoading, data, reset } = params;
    const toUpdate: any = {};
    for (var attr in data[0]) {
      if (data[0][attr] !== project[attr]) toUpdate[attr] = data[0][attr];
    }
    runRequest({
      setData: ({ updated }: any) => {
        if (updated) {
          const projectUpdated = { ...project, ...data[0] };
          updateState(({ state }: any) => {
            const newProjects = [...state.projects];
            newProjects.splice(
              newProjects.findIndex((c) => c.uuid === projectUpdated.uuid),
              1,
              projectUpdated
            );
          });
          setProject({ ...projectUpdated });
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
  const [highOrderCallback, HOCTrigger]: any = getHOCAndTrigger(updateCallback);

  const onClick = (e: any) => {
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
                  setData: (data: any) => {
                    updateState(({ setProjects, state }: any) => {
                      const newProjects = [...state.projects];
                      newProjects.splice(
                        newProjects.findIndex((c) => c.uuid === data.uuid),
                        1
                      );
                      setProjects(newProjects);
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
      className={styles.container.concat(
        " ",
        !even && styles.container_reversed
      )}
      ref={ref}
    >
      {!beingEdited ? (
        <>
          <h1 className={styles.title}>{name}</h1>
          <Memo>
            <div className={styles.images}>
              <InfiniteCarousel toRight={even} gap={".1rem"} timing={20}>
                {images.map((image: any, index: number) => (
                  <Memo key={index}>
                    <AsyncImage
                      className={styles.image}
                      key={index}
                      loader={<CubeGridLoader />}
                      {...{
                        src: image,
                        onClick: () => {
                          setCurrentModal(
                            <img
                              alt=""
                              src={image}
                              className={`${styles.image} ${styles.zoomed}`}
                              style={{ cursor: "zoom-out", maxWidth: "100%" }}
                              onClick={() => setCurrentModal(null)}
                            />
                          );
                        },
                      }}
                    />
                  </Memo>
                ))}
              </InfiniteCarousel>
            </div>
          </Memo>
          <div className={styles.descriptions}>
            {descriptions.map((description: any, index: number) => (
              <article className={styles.description} key={index}>
                {description}
              </article>
            ))}
          </div>
          <div className={styles.metadata}>
            <div className={styles.stack}>
              {stack.map((s: any, index: any) => {
                const Component = SVGIndexes[s] && SVGIndexes[s];
                if (!Component) return null;
                return <Component key={index} />;
              })}
            </div>
            <div className={styles.state}>
              <i className={stateIcons[state]}>
                <span>{state}</span>
              </i>

              {kind.map((k: any, index: any) => (
                <i key={index} className={kindIcons[k]}>
                  <span>{k}</span>
                </i>
              ))}

              <span>v {version}</span>
            </div>
          </div>
          <div className={styles.quick_access}>
            <a
              className={`${!uri && styles.disabled}`}
              href={uri}
              target="_blank"
            >
              <i className="fa-solid fa-square-arrow-up-right"></i>
              &nbsp;&nbsp; Ir al Proyecto
            </a>
            <a
              className={`${!codeUri && styles.disabled}`}
              href={codeUri}
              target="_blank"
            >
              <i className="fa-solid fa-code"></i>&nbsp;&nbsp; Ver Codigo
            </a>
          </div>
        </>
      ) : (
        <DefineForms
          {...{
            baseSchema: {
              name,
              descriptions,
              images,
              tags,
              stack: {
                inputType: [INPUT_TYPES.SELECTION],
                value: [stackOps],
                label: "stack",
                controlledValue: stack,
              },
              kind: {
                inputType: [INPUT_TYPES.SELECTION],
                value: [kindOps],
                label: "kind",
                controlledValue: kind,
              },
              state: {
                inputType: INPUT_TYPES.SELECTION,
                value: stateOps,
                label: "state",
                controlledValue: state,
              },
              uri,
              version,
            },
            highOrderCallback,
            modifiable: false,
          }}
        />
      )}

      {token /* && buildedBy.includes(username) */ && (
        <div className={styles.dashboard}>
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
              className={`${styles.button} ${
                beingEdited ? styles.danger : styles.secondary
              }`}
              name="secondary"
              id={uuid}
              onClick={onClick}
            >
              {beingEdited ? (uuid ? "Cancelar" : "Limpiar") : "Editar"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export { ProjectSkeleton };
