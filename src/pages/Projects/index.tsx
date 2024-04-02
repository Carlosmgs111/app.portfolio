import { useState, useEffect, useReducer } from "react";
import { getContextValue, CONTEXTS } from "../../contexts";
import axios from "axios";
import { URL_API } from "../../services";
import { Project } from "../../containers/Project";
import styles from "./styles.module.css";
import { useTrackSidebar } from "../../hooks/useTrackSidebar";
import { MultiSidebar } from "../../components/Sidebars/MultiSidebar";
import {
  PanelSidebar,
  innerItems,
} from "../../components/Sidebars/PanelSidebar";
import { Banner } from "../../components/Banner";
import { Page } from "../../components/Page";
import { Modal } from "../../components/Modal";
import { runRequest } from "../../services/runRequest";
import { DefineSchema } from "../../components/DefineSchema";
import { headers } from "../../services/configs";
import { setActions, getDispatchSetFunctions, settingName } from "../../utils";
import { Stack } from "@mui/material";

export function Projects() {
  const { token, currentLang } = getContextValue(CONTEXTS.Global);
  const [TrackSidebar, setElements, refreshRefs]: any = useTrackSidebar();
  const requestHeaders = headers();
  const [projectsOptions, setProjectsOptions] = useState({
    stack: [],
    state: [],
    kind: [],
  });
  const bannerMessage: any = { es: "Proyectos", en: "Projects" };
  const [projectSchema, setProjectSchema]: any = useState({
    name: "",
    emitedBy: "",
    // ? `{` symbol used for mark a select object controller
    "emitedBy{": [],
    emitedAt: new Date().getTime(),
    // ? `~` symbol used for mark a date object controller
    "emitedAt~": new Date().toISOString().slice(0, 10),
    image: "",
    url: "",
  });

  const initialState = {
    projects: [],
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
  const { projects, currentModal, loading, error } = state;
  const { setProjects, setCurrentModal, setLoading, setError }: any =
    getDispatchSetFunctions(dispatch, actionTypes);

  const sidebars = [
    <TrackSidebar />, // ? ⬅️ this is a rendered component, so we just put as a variable and it is not called
  ];

  const updateState = (cb: Function) =>
    cb({
      state,
      dispatch,
      actionTypes,
      setElements,
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
                        <DefineSchema
                          {...{
                            title: "Agregar nuevo(s) proyecto(s)",
                            baseSchema: {
                              name: "",
                              descriptions: [""],
                              images: [""],
                              tags: [""],
                              "stack{": projectsOptions.stack,
                              "kind{": projectsOptions.kind,
                              "state{": projectsOptions.state,
                              uri: "",
                              version: "",
                            },
                            nonOptionals: [
                              "name",
                              "descriptions",
                              "images",
                              "tags",
                              "stack{",
                              "kind{",
                              "state{",
                              "uri",
                              "version",
                              "state",
                              "stack",
                              "kind",
                            ],
                            buttons: { add: "agregar", main: "Guardar" },
                            onClickHandler: ({
                              setError,
                              setLoading,
                              data,
                              reset,
                            }: any) => {
                              runRequest({
                                setData: (data: any) => {
                                  setProjects([...projects, ...data]);
                                  setElements([
                                    ...projects.map((p: any) => p.name),
                                    ...data.map((p: any) => p.name),
                                  ]);
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

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await axios.get(`${URL_API}/projects`);
        const { projects, kind, state, stack } = data;
        setProjects([...projects]);
        setProjectsOptions({ kind, state, stack });
        setElements([...projects.map((project: any) => project.name)]);
      } catch (e) {
        setLoading(false);
        setError(e);
      }
    };
    fetchProjects();
    return () => {
      setProjects([]);
      refreshRefs([]);
    };
  }, [token]);

  return (
    <Page>
      <MultiSidebar
        {...{
          sidebars,
        }}
      >
        <div className={styles.main_container}>
          {projects.map((project: any, index: number) => (
            <Project
              key={index}
              {...{
                initialState: project,
                even: index % 2 === 0,
                refreshRefs,
                updateState,
                setCurrentModal,
              }}
            />
          ))}
        </div>
      </MultiSidebar>
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
