import { useEffect } from "react";
import { useStateValue } from "../../contexts/context";
import axios from "axios";
import { URL_API } from "../../services";
import { Project, ProjectSkeleton } from "../../containers/Project";
import styles from "./styles.module.css";
import { useTrackSidebar } from "../../hooks/useTrackSidebar";
import { SidePanel } from "../../components/SidePanel";
import { PanelSidebar, innerItems } from "../../components/PanelSidebar";
import { Page } from "../../components/Page";
import { Modal } from "../../components/Modal";
import { runRequest } from "../../services/runRequest";
import { DefineForms, INPUT_TYPES } from "../../components/DefineForms";
import { headers } from "../../services/configs";
import { v4 as uuidv4 } from "uuid";
import { useReduceState } from "../../hooks/useReduceState";
import { labelCases } from "../../utils";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";
import { Memo } from "../../components/Memo";

export function Projects({}: any) {
  const location = useLocation();
  const [
    {
      token,
      language,
      projects: globalProjects,
      projectsOptions: globalProjectsOptions,
    },
    globalDispatch,
  ] = useStateValue();
  const { TrackSidebar, ContentWrapper }: any = useTrackSidebar();
  const requestHeaders = headers();
  const initialState = {
    projects: globalProjects,
    projectsOptions: globalProjectsOptions,
    currentModal: null,
    loading: false,
    error: null,
  };

  const [state, dispatch] = useReduceState(initialState);
  const { projects, projectsOptions, currentModal, loading, error } = state;
  const { stack: stackOps, kind: kindOps, state: stateOps } = projectsOptions;

  const sidebars = [
    <TrackSidebar icon="fa-solid fa-compass-drafting" />, // ? ⬅️ this is a rendered component, so we just put as a variable and it is not called
  ];
  const updateState = (cb: Function) =>
    cb({
      state,
      dispatch,
    });

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
                !currentModal
                  ? dispatch({
                      currentModal: (
                        <div
                          style={{
                            width: "60rem",
                          }}
                        >
                          <DefineForms
                            {...{
                              baseSchema: {
                                name: "",
                                descriptions: [""],
                                images: [""],
                                tags: [""],
                                stack: {
                                  inputType: [INPUT_TYPES.SELECTION],
                                  value: [projectsOptions.stack],
                                  label: "stack",
                                },
                                kind: {
                                  inputType: [INPUT_TYPES.SELECTION],
                                  value: [projectsOptions.kind],
                                  label: "kind",
                                },
                                state: {
                                  inputType: INPUT_TYPES.SELECTION,
                                  value: projectsOptions.state,
                                  label: "state",
                                },
                                uri: "",
                                version: "",
                              },
                              onClickHandler: ({
                                setError,
                                setLoading,
                                data,
                                reset,
                              }: any) => {
                                runRequest({
                                  /*************  ✨ Codeium Command ⭐  *************/
                                  /**
                                   * Updates the projects state by dispatching a new array of projects.
                                   * Merges the existing projects with the new data provided.
                                   *
                                   * @param {any} data - The new project data to be added to the state.
                                   */
                                  /******  9f444335-9e35-4ac6-af81-de7c6dfa0fba  *******/
                                  setData: (data: any) => {
                                    dispatch({
                                      projects: [...projects, ...data],
                                    });
                                  },
                                  setError,
                                  setLoading,
                                }).post(
                                  `projects/projects`,
                                  {
                                    projects: [{ ...data[0], uuid: uuidv4() }],
                                  },
                                  {
                                    ...requestHeaders,
                                  }
                                );
                                reset();
                                dispatch({ currentModal: null });
                              },
                            }}
                          />
                        </div>
                      ),
                    })
                  : dispatch({ currentModal: null });
              },
            },
          ],
        }}
      />
    );

  //? ⬇️ this could be abtracted to a hook or even in a component
  useEffect(() => {
    const { hash } = location;
    let timeoutId: any;
    const scrollToElement = (id: any) => {
      if (!id) return;
      const projectContainer = document.getElementById(id);
      if (!projectContainer) {
        timeoutId = setTimeout(() => scrollToElement(id), 10);
        return;
      }
      requestAnimationFrame(() => {
        projectContainer.scrollIntoView({
          behavior: "smooth",
        });
      });
      setTimeout(() => clearTimeout(timeoutId), 2000);
    };
    if (hash) {
      const id = hash.replace("#", "");
      scrollToElement(decodeURIComponent(id));
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [location]);
  //? ⬆️
  useEffect(() => {
    const fetchProjects = async () => {
      dispatch({ loading: true });
      try {
        const { data } = await axios.get(`${URL_API}/projects`);
        const { projects, kind, state, stack } = data;
        dispatch({ projects: [...projects] });
        dispatch({ projectsOptions: { kind, state, stack } });
      } catch (e) {
        dispatch({ loading: false });
        dispatch({ error: e });
      }
      dispatch({ loading: false });
    };
    !projects[0] && fetchProjects();
    return () => {
      dispatch({ projects: [] });
    };
  }, []);
  /* // ? this update global state  */
  useEffect(() => {
    globalDispatch({ projects });
    globalDispatch({ projectsOptions });
  }, [projects, projectsOptions]);
  /* // ? */
  return (
    <Page>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Projects &bull; Carlos Muñoz Gachancipá</title>
      </Helmet>
      <SidePanel
        {...{
          // width: "240px",
          float: false,
          multi: false,
          sidebars,
        }}
      >
        <Memo deps={[projects, loading]}>
          <div className={styles.main_container}>
            {loading ? (
              <ProjectSkeleton />
            ) : (
              <ContentWrapper>
                {projects.map((project: any, index: number) => (
                  <Project
                    key={index}
                    {...{
                      id: labelCases(project.name).LS,
                      title: project.name,
                      initialState: project,
                      even: index % 2 === 0,
                      updateState,
                      setCurrentModal: dispatch,
                      stateOps,
                      stackOps,
                      kindOps,
                    }}
                  />
                ))}
              </ContentWrapper>
            )}
          </div>
        </Memo>
      </SidePanel>
      <Modal
        {...{
          injected: currentModal,
          setInjected: dispatch,
          over: !false,
        }}
      ></Modal>
    </Page>
  );
}
