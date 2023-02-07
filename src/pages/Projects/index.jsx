import { useState, useEffect, useReducer } from "react";
import { getContextValue, CONTEXTS } from "../../contexts";
import axios from "axios";
import { URL_API } from "../../services";
import { Project } from "../../containers/Project";
import { Container, MainContainer } from "./styles";
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
import { Dashboard } from "./styles";
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
  const setFunctions = getDispatchSetFunctions(dispatch, actionTypes);
  const { setProjects, setCurrentModal, setLoading, setError } = setFunctions;

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
                      <Dashboard>
                        <DefineSchema
                          {...{
                            title: "Add New Project(s)",
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
                              parsedSchema,
                              reset,
                            }) => {
                              runRequest({
                                setData: (data) => {
                                  setProjects([...projects, data]);
                                  setElements([
                                    ...projects.map((p) => p.name),
                                    data.name,
                                  ]);
                                },
                                setError,
                                setLoading,
                              }).post(`projects`, parsedSchema[0], {
                                ...requestHeaders,
                              });
                              reset();
                            },
                          }}
                        />
                      </Dashboard>
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
          "background-image":
            "url('https://images.pexels.com/photos/5186869/pexels-photo-5186869.jpeg?cs=srgb&dl=pexels-fiona-art-5186869.jpg&fm=jpg')",
        }}
      >
        Projects
      </Banner>
      <MultiSidebar
        {...{
          sidebars,
        }}
      />
      <Container>
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
      </Container>
      <Modal
        {...{
          active: false,
          injected: currentModal,
          over: !false,
          embedButton: (
            <i
              id="newNote"
              type="button"
              onClick={() => setCurrentModal(null)}
              className="fa-solid fa-arrow-up-right-from-square"
            ></i>
          ),
        }}
      />
    </Page>
  );
}
