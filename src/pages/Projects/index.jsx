import { useState, useEffect, useReducer } from "react";
import { getContextValue, CONTEXTS } from "../../contexts";
import axios from "axios";
import { URL_API } from "../../services";
import { Project } from "../../containers/Project";
import { Container, MainContainer, Dashboard } from "./styles";
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

export function Projects() {
  const { token } = getContextValue(CONTEXTS.Global);
  const [TrackSidebar, setElements, refreshRefs] = useTrackSidebar();
  const requestHeaders = headers();
  const [projectSchema, setProjectSchema] = useState({
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

  const reducer = (state, dispatch) => {
    const { type, payload } = dispatch;
    const actions = {};
    for (let s in initialState) {
      actions[settingName(s)] = { ...state, [s]: payload };
    }
    return actions[type] || state;
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const { projects, currentModal, loading, error } = state;
  const { setProjects, setCurrentModal, setLoading, setError } =
    getDispatchSetFunctions(dispatch, actionTypes);

  const sidebars = [
    TrackSidebar, // ? ⬅️ this is a rendered component, so we just put as a variable and it is not called
  ];

  const updateState = (cb) =>
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
                              uri: "",
                              version: "",
                            },
                            nonOptionals: [
                              "name",
                              "descriptions",
                              "images",
                              "tags",
                              "uri",
                              "version",
                            ],
                            buttons: { add: "agregar", main: "Guardar" },
                            onClickHandler: ({
                              setError,
                              setLoading,
                              data,
                              reset,
                            }) => {
                              runRequest({
                                setData: (data) => {
                                  setProjects([...projects, ...data]);
                                  setElements([
                                    ...projects.map((p) => p.name),
                                    ...data.map((p) => p.name),
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
        setProjects([...data]);
        setElements([...data.map((project) => project.name)]);
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
      <Banner
        config={{
          background: "linear-gradient(to right, #e4ff1a, #fb5609)",
        }}
      >
        Proyectos
      </Banner>
      <MultiSidebar
        {...{
          sidebars,
        }}
      >
        <MainContainer>
          {projects.map((project, index) => (
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
        </MainContainer>
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
