import { useState, useEffect, useReducer } from "react";
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
import { setActions, getDispatchSetFunctions, settingName } from "../../utils";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";

export function Projects({}: any) {
  const location = useLocation();
  const [
    {
      token,
      currentLang,
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

  const actionTypes = setActions([], initialState);

  const reducer = (state: any, dispatch: Function) => {
    const { type, payload }: any = dispatch;
    const actions: any = {};
    for (let s in initialState) {
      actions[settingName(s)] = { ...state, [s]: payload };
    }
    return actions[type] || state;
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const { projects, projectsOptions, currentModal, loading, error } = state;
  const { stack: stackOps, kind: kindOps, state: stateOps } = projectsOptions;
  const {
    setProjects,
    setProjectsOptions,
    setCurrentModal,
    setLoading,
    setError,
  }: any = getDispatchSetFunctions(dispatch, actionTypes);

  const sidebars = [
    <TrackSidebar />, // ? ⬅️ this is a rendered component, so we just put as a variable and it is not called
  ];
  const updateState = (cb: Function) =>
    cb({
      state,
      dispatch,
      actionTypes,
      setProjects,
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
                  ? setCurrentModal(
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
                                setData: (data: any) => {
                                  setProjects([...projects, ...data]);
                                },
                                setError,
                                setLoading,
                              }).post(
                                `projects/projects`,
                                { projects: data },
                                {
                                  ...requestHeaders,
                                }
                              );
                              reset();
                            },
                          }}
                        />
                      </div>
                    )
                  : setCurrentModal(null);
              },
            },
          ],
        }}
      />
    );

  /* //? ⬇️ this could be abtracted to a hook or even in a component */
  useEffect(() => {
    const { hash } = location;
    let timeoutId: any;
    const scrollToElement = (id: any) => {
      if (!id) return;
      const projectContainer = document.getElementById(id);
      if (projectContainer) {
        requestAnimationFrame(() => {
          projectContainer.scrollIntoView({ behavior: "smooth" });
        });
      } else {
        timeoutId = setTimeout(() => scrollToElement(id), 10);
      }
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
  /* //? ⬆️ */
  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`${URL_API}/projects`);
        const { projects, kind, state, stack } = data;
        setProjects([...projects]);
        setProjectsOptions({ kind, state, stack });
      } catch (e) {
        setLoading(false);
        setError(e);
      }
      setLoading(false);
    };
    !projects[0] && fetchProjects();
    return () => {
      setProjects([]);
    };
  }, []);
  /* // ? this update global state  */
  useEffect(() => {
    globalDispatch({
      type: actionTypes.setProjects,
      payload: projects,
    });
    globalDispatch({
      type: actionTypes.setProjectsOptions,
      payload: projectsOptions,
    });
  }, [projects, projectsOptions]);
  /* // ? */
  return (
    <Page>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Projects | Carlos Muñoz Gachancipá</title>
      </Helmet>
      <SidePanel
        {...{
          width: "240px",
          float: false,
          multi: false,
          sidebars,
        }}
      >
        <div className={styles.main_container}>
          {loading ? (
            <ProjectSkeleton />
          ) : (
            <ContentWrapper>
              {projects.map((project: any, index: number) => (
                <Project
                  key={index}
                  {...{
                    id: project.name,
                    initialState: project,
                    even: index % 2 === 0,
                    updateState,
                    setCurrentModal,
                    stateOps,
                    stackOps,
                    kindOps,
                  }}
                />
              ))}
            </ContentWrapper>
          )}
        </div>
      </SidePanel>
      <Modal
        {...{
          injected: currentModal,
          setInjected: setCurrentModal,
          over: !false,
        }}
      ></Modal>
    </Page>
  );
}
