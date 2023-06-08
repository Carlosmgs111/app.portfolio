import { Container, MainContainer, Dashboard } from "./styles";
import { Banner } from "../../components/Banner";
import { Skill } from "../../containers/Skill";
import { MultiSidebar } from "../../components/Sidebars/MultiSidebar";
import {
  PanelSidebar,
  innerItems,
} from "../../components/Sidebars/PanelSidebar";
import { useTrackSidebar } from "../../hooks/useTrackSidebar";
import { getContextValue, CONTEXTS } from "../../contexts";
import { useEffect, useReducer } from "react";
import { setActions, getDispatchSetFunctions, settingName } from "../../utils";
import { DefineSchema } from "../../components/DefineSchema";
import { Modal } from "../../components/Modal";
import { Page } from "../../components/Page";
import { runRequest } from "../../services/runRequest";
import { headers } from "../../services/configs";

export function Skills() {
  const { token } = getContextValue(CONTEXTS.Global);
  const requestHeaders = headers();
  const [TrackSidebar, setElements, refreshRefs] = useTrackSidebar();

  const initialState = {
    skills: [],
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
  const { skills, currentModal, loading, error } = state;
  const { setSkills, setCurrentModal, setLoading, setError } =
    getDispatchSetFunctions(dispatch, actionTypes);

  const updateState = (cb) =>
    cb({
      state,
      dispatch,
      actionTypes,
      setElements,
      setSkills,
    });

  useEffect(() => {
    runRequest({
      setData: async (data) => {
        setSkills(data.map((d) => ({ ...d, visible: true })));
        setElements([...data.map((c) => c.name)]);
      },
      setError,
      setLoading,
    }).get("skills" /* , { ...requestHeaders } */);

    return () => {};
  }, [token]);

  const sidebars = [
    TrackSidebar,
    <PanelSidebar
      {...{
        id: "panel-sidebar",
        items: [
          {
            innerItem: innerItems.InnerItem,
            className: "fa-solid fa-plus",
            content: "Agregar Habilidad",
            onClick: () => {
              !currentModal
                ? setCurrentModal(
                    <Dashboard>
                      <DefineSchema
                        {...{
                          title: "Agregar Nueva(s) Habilidad(es)",
                          baseSchema: {
                            name: "",
                            description: "",
                            image: "",
                            tags: [""],
                          },
                          nonOptionals: [
                            "name",
                            "description",
                            "image",
                            "tags",
                          ],
                          buttons: { add: "agregar", main: "Guardar" },
                          onClickHandler: ({
                            setError,
                            setLoading,
                            data,
                            reset,
                          }) => {
                            console.log("🚀 ~ file: index.jsx:104 ~ Skills ~ data:", data)
                            
                            runRequest({
                              setData: (data) => {
                                setSkills([...skills, ...data]);
                                setElements([
                                  ...skills.map((p) => p.name),
                                  ...data.map((p) => p.name),
                                ]);
                              },
                              setError,
                              setLoading,
                            }).post(
                              `skills/skills`,
                              { skills: data },
                              {
                                ...requestHeaders,
                              }
                            );
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
    />,
  ];
  return (
    <Page>
      <Banner
        {...{
          config: {
            background: "linear-gradient(to right, #f026df, #fb5609)",
          },
        }}
      >
        Habilidades
      </Banner>
      <MultiSidebar {...{ sidebars }}>
        <MainContainer>
          {skills.map((skill, index) => (
            <Skill
              {...{
                initialState: skill,
                key: index,
                index,
                refreshRefs,
                updateState,
                state,
              }}
            />
          ))}
        </MainContainer>
      </MultiSidebar>
      <Modal
        {...{
          active: false,
          injected: currentModal,
          setInjected: setCurrentModal,
          over: !false,
          embedbutton: (
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
