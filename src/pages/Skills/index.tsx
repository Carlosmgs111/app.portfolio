import styles from "./styles.module.css";
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
import { DefineForms } from "../../components/DefineForms";
import { Modal } from "../../components/Modal";
import { Page } from "../../components/Page";
import { runRequest } from "../../services/runRequest";
import { headers } from "../../services/configs";

export function Skills() {
  const { token, currentLang } = getContextValue(CONTEXTS.Global);
  const requestHeaders = headers();
  const [TrackSidebar, ElementsWrapper]: any = useTrackSidebar();
  const bannerMessage: any = { es: "Habilidades", en: "Skills" };
  const initialState = {
    skills: [],
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
  const { skills, currentModal, loading, error } = state;
  const { setSkills, setCurrentModal, setLoading, setError }: any =
    getDispatchSetFunctions(dispatch, actionTypes);

  const updateState = (cb: Function) =>
    cb({
      state,
      dispatch,
      actionTypes,
      setSkills,
    });

  useEffect(() => {
    runRequest({
      setData: async (data: any) => {
        setSkills(data.map((d: any) => ({ ...d, visible: true })));
      },
      setError,
      setLoading,
    }).get("skills" /* , { ...requestHeaders } */);

    return () => {};
  }, [token]);

  const sidebars = [
    <TrackSidebar />,
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
                    <div className={styles.dashboard}>
                      <DefineForms
                        {...{
                          baseSchema: {
                            name: "",
                            description: "",
                            image: "",
                            tags: [""],
                          },
                          buttons: { add: "agregar", main: "Guardar" },
                          onClickHandler: ({
                            setError,
                            setLoading,
                            data,
                            reset,
                          }: any) => {
                            runRequest({
                              setData: (data: any) => {
                                setSkills([...skills, ...data]);
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
                    </div>
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
      <MultiSidebar {...{ sidebars }}>
        <div className={styles.main_container}>
          <ElementsWrapper>
            {skills.map((skill: any, index: number) => (
              <Skill
                {...{
                  initialState: skill,
                  key: index,
                  index,
                  updateState,
                  state,
                }}
              />
            ))}
          </ElementsWrapper>
        </div>
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
              onClick={() => setCurrentModal(null)}
              className="fa-solid fa-arrow-up-right-from-square"
            ></i>
          ),
        }}
      />
    </Page>
  );
}
