import {
  Certification,
  CertificationSkeleton,
} from "../../containers/Certification";
import {
  PanelSidebar,
  innerItems,
} from "../../components/Sidebars/PanelSidebar";
import {
  manyfy,
  injectAttrsToReactElements,
  normalize,
  settingName,
  setActions,
  getDispatchSetFunctions,
} from "../../utils";
import { Page } from "../../components/Page";
import { Banner } from "../../components/Banner";
import { MultiSidebar } from "../../components/Sidebars/MultiSidebar";
import { useState, useEffect, useReducer } from "react";
import { useTrackSidebar } from "../../hooks/useTrackSidebar";
import { OnLoading } from "../../components/OnLoading";
import { OnError } from "../../components/OnError";
import { Modal } from "../../components/Modal";
import styles from "./styles.module.css";
import { getContextValue, CONTEXTS } from "../../contexts";
import { runRequest } from "../../services/runRequest";
import { useToggle } from "../../hooks/useToggle";
import { Mapfy } from "../../utils";
import { addCertification, addInstitution } from "./sections";
import { useSearchParams, useLocation } from "react-router-dom";

export function Certifications() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchedUsername, setSearchedUsername] = useState(
    searchParams.get("username")
  );
  const { token, username, currentLang } = getContextValue(CONTEXTS.Global);
  const [owned, switchOwned] = useToggle(false, true);

  const initialState = {
    institutions: [],
    certifications: [],
    currentModal: null,
    loading: true,
    error: null,
  };

  const actionTypes = setActions([], initialState);

  const bannerMessage: any = { en: "Certifications", es: "Certificados" };

  const reducer = (state: any, dispatch: Function) => {
    const { type, payload }: any = dispatch;
    const actions: any = {};
    for (let s in initialState) {
      actions[settingName(s)] = { ...state, [s]: payload };
    }
    return actions[type] || state;
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const { institutions, certifications, currentModal, loading, error } = state;

  const setFunctions = getDispatchSetFunctions(dispatch, actionTypes);

  const {
    setCertifications,
    setInstitutions,
    setCurrentModal,
    setLoading,
    setError,
  }: any = setFunctions;

  const [TrackSidebar, setElements, refreshRefs]: any = useTrackSidebar({
    innerItems: true,
  });

  const [certificationSchema, setCertificationSchema] = useState({
    title: "",
    emitedBy: "",
    // ? `{` symbol used for mark a select object controller
    "emitedBy{": [],
    emitedAt: new Date().getTime(),
    // ? `~` symbol used for mark a date object controller
    "emitedAt~": new Date().toISOString().slice(0, 10),
    image: "",
    url: "",
    tags: [""],
  });

  const institutionSchema = {
    name: "",
    businessName: "",
    descriptions: [""],
    urls: [""],
  };

  const modals: any = {
    institutions: (
      <div style={{ position: "absolute", right: 0 }}>
        <h1>Hola</h1>
      </div>
    ),
    addCertification: addCertification({
      certificationSchema,
      setElements,
      setCertifications,
      certifications,
      setCurrentModal,
    }),
    addInstitution: addInstitution({
      institutionSchema,
      setElements,
      setInstitutions,
      institutions,
    }),
  };

  Mapfy(modals).forEach(
    (modal: any, key) =>
      (modals[key] = Object.assign({ modalName: key }, { ...modal }))
  );

  const switchModal = (currentModal: any, modal: any) => {
    if (!currentModal) return setCurrentModal(modal);
    const [currentModalName, modalName] = [
      currentModal.modalName,
      modal.modalName,
    ];
    if (currentModal && currentModalName !== modalName)
      setCurrentModal({ ...modal });
    if (currentModalName === modalName) setCurrentModal(null);
  };

  let items: any = [
    {
      innerItem: innerItems.Input,
      className: "fa-solid fa-magnifying-glass",
      onChange: (e: any) =>
        console.log(
          certifications.filter((c: any) =>
            c.title.toLowerCase().includes(e.target.value.toLowerCase())
          )
        ),
    },
    {
      innerItem: innerItems.Input,
      className: "fa-solid fa-filter",
      onChange: (e: any) => {
        const isIncluded = (c: any) =>
          normalize(c.title.toLowerCase()).includes(
            e.target.value.toLowerCase()
          );
        const isTagIncluded = (c: any) =>
          Boolean(
            c.tags.filter((tag: any) =>
              tag.includes(e.target.value.toLowerCase())
            )[0]
          );
        setCertifications([
          ...certifications.map((c: any) => ({
            ...c,
            visible: isIncluded(c) || isTagIncluded(c),
          })),
        ]);
        setElements([
          ...certifications
            .filter((c: any) => isIncluded(c) || isTagIncluded(c))
            .map((c: any) => c.title),
        ]);
      },
    },
  ];

  if (token && !loading)
    items = [
      ...items,
      { innerItem: innerItems.Separator },
      {
        innerItem: innerItems.InnerItem,
        content: owned ? "Todas" : "Propias",
        className: owned ? "fa-solid fa-eye" : "fa-solid fa-eye-slash",
        onClick: () => {
          switchOwned();
          setCertifications([
            ...certifications.map((c: any) => ({
              ...c,
              visible: owned || c.grantedTo === username,
            })),
          ]);
        },
      },
      {
        innerItem: innerItems.InnerItem,
        content: "Ver Instituciones",
        className: "fa-solid fa-building-columns",
        onClick: () => switchModal(currentModal, modals.institutions),
      },
      {
        innerItem: innerItems.InnerItem,
        content: "Agregar Certificado",
        className: "fa-solid fa-plus",
        visibility: token,
        onClick: () => switchModal(currentModal, modals.addCertification),
      },
      {
        innerItem: innerItems.InnerItem,
        content: "Agregar Institucion",
        className: "fa-solid fa-fingerprint",
        visibility: token,
        onClick: () => switchModal(currentModal, modals.addInstitution),
      },
    ];

  const sidebars = [
    TrackSidebar,
    <PanelSidebar id="panel-sidebar" items={items}></PanelSidebar>,
  ];

  const updateState = (cb: Function) =>
    cb({
      state,
      dispatch,
      actionTypes,
      setElements,
      ...setFunctions,
    });

  useEffect(() => {
    runRequest({
      setData: async (data: any) => {
        setCertifications(data.map((d: any) => ({ ...d, visible: true })));
        setElements([...data.map((c: any) => c.title)]);
        await runRequest({
          setData: (data: any) => {
            setCertificationSchema({
              ...certificationSchema,
              emitedBy: data[0].name,
              "emitedBy{": data.map((i: any) => i.name),
            });
            setInstitutions(data);
          },
          setError,
          setLoading,
        }).get("institutions");
      },
      setError,
      setLoading,
    }).get("certifications" /* , { ...requestHeaders } */);

    return () => {};
  }, [token]);

  return (
    <Page /* name="certifications" */>
      {/* // ? ⬇️ Start optionals components */}
      <Banner
        {...{
          background: "radial-gradient(circle at 20% 0%, #FFE000,  #799F0C)",
        }}
      >
        {bannerMessage[currentLang]}
      </Banner>

      {/* // ? ⬆️ End optionals components */}
      <MultiSidebar
        {...{
          sidebars,
        }}
      >
        <div className={styles.main_container}>
          {certifications.map(
            (certification: any, index: number) =>
              certification.visible && (
                <Certification
                  {...{
                    key: certification.uuid,
                    initialCertification: certification,
                    refreshRefs,
                    setCurrentModal,
                    updateState,
                    institutions,
                  }}
                />
              )
          )}
          {(username || searchedUsername) && (
            <Banner
              {...{
                customeMessage: false,
                config: {
                  "background-image":
                    "url(https://wallpaperaccess.com/full/53928.jpg)",
                },
              }}
            >
              Certificados de la comunidad
            </Banner>
          )}
        </div>
      </MultiSidebar>
      {/* // ? ⬇️ Start page support components */}
      <OnLoading
        {...{
          loading,
          component: styles.main_container,
          contain: manyfy(<CertificationSkeleton />, 12).map((c, index) =>
            injectAttrsToReactElements([c], { key: index })
          ),
        }}
      />
      <OnError {...{ error }} />
      <Modal
        {...{
          active: false,
          injected: currentModal,
          setInjected: setCurrentModal,
          over: !false,
          embedbutton: (
            <i
              onClick={() => setCurrentModal(null)}
              className="fa-solid fa-xmark"
            ></i>
          ),
        }}
      />
      {/* // ? ⬆️ End page support components */}
    </Page>
  );
}
