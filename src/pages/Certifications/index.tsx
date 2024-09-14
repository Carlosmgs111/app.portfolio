import {
  Certification,
  CertificationSkeleton,
} from "../../containers/Certification";
import { PanelSidebar, innerItems } from "../../components/PanelSidebar";
import {
  manyfy,
  injectAttrsToReactElements,
  normalize,
  settingName,
  setActions,
  getDispatchSetFunctions,
} from "../../utils";
import { Page } from "../../components/Page";
import { SidePanel } from "../../components/SidePanel";
import { useState, useEffect, useReducer } from "react";
import { useTrackSidebar } from "../../hooks/useTrackSidebar";
import { Modal } from "../../components/Modal";
import styles from "./styles.module.css";
import { useStateValue } from "../../contexts/context";
import { runRequest } from "../../services/runRequest";
import { useToggle } from "../../hooks/useToggle";
import { Mapfy } from "../../utils";
import { addCertification, addInstitution } from "./sections";
import { INPUT_TYPES } from "../../components/DefineForms";
import Helmet from "react-helmet";
import { Memo } from "../../components/Memo";

console.log("Certifications")

export function Certifications({}: any) {
  const [
    {
      token,
      username,
      certifications: globalCertifications,
      institutions: globalInstitutions,
    },
    globalDispatch,
  ] = useStateValue();
  const [owned, switchOwned] = useToggle(false, true);

  const initialState = {
    institutions: globalInstitutions,
    certifications: globalCertifications,
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

  const { institutions, certifications, currentModal, loading, error } = state;

  const setFunctions = getDispatchSetFunctions(dispatch, actionTypes);

  const {
    setCertifications,
    setInstitutions,
    setCurrentModal,
    setLoading,
    setError,
  }: any = setFunctions;

  const { TrackSidebar, ContentWrapper }: any = useTrackSidebar();

  const [certificationSchema, setCertificationSchema]: any = useState({
    title: "",
    emitedBy: {
      inputType: INPUT_TYPES.SELECTION,
      label: "Emitido por",
      value: [""],
    },
    emitedAt: {
      inputType: INPUT_TYPES.DATE,
      label: "fecha",
      value: new Date().getTime(),
    },
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
      setCertifications,
      certifications,
      setCurrentModal,
    }),
    addInstitution: addInstitution({
      institutionSchema,
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
    <TrackSidebar />,
    <PanelSidebar id="panel-sidebar" items={items}></PanelSidebar>,
  ];

  const updateState = (cb: Function) =>
    cb({
      state,
      dispatch,
      actionTypes,
      ...setFunctions,
    });

  useEffect(() => {
    !certifications[0] &&
      runRequest({
        setData: async (data: any) => {
          setCertifications(data.map((d: any) => ({ ...d, visible: true })));
          await runRequest({
            setData: (data: any) => {
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
  }, []);

  useEffect(() => {
    setCertificationSchema({
      ...certificationSchema,
      emitedBy: {
        ...certificationSchema.emitedBy,
        value: institutions.map((i: any) => i.name),
      },
    });
    globalDispatch({
      type: actionTypes.setCertifications,
      payload: certifications,
    });
    globalDispatch({
      type: actionTypes.setInstitutions,
      payload: institutions,
    });
  }, [certifications, institutions]);

  return (
    <Page>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Certications | Carlos Muñoz Gachancipá</title>
      </Helmet>
      <SidePanel
        {...{
          width: "240px",
          float: false,
          multi: false,
          sidebars,
        }}
      >
        <Memo deps={[certifications, loading]}>
          <div className={styles.main_container}>
            {!loading && (
              <ContentWrapper>
                {certifications.map((certification: any, index: number) => (
                  <Certification
                    key={certification.uuid}
                    {...{
                      id: certification.uuid,
                      title: certification.title,
                      initialCertification: certification,
                      setCurrentModal,
                      updateState,
                      institutions,
                    }}
                  />
                ))}
              </ContentWrapper>
            )}
            {loading &&
              manyfy(
                <div
                  style={{
                    height: "28rem",
                    width: "48rem",
                    borderRadius: ".8rem",
                    overflow: "hidden",
                  }}
                >
                  <CertificationSkeleton />
                </div>,
                12
              ).map((c, index) =>
                injectAttrsToReactElements([c], { key: index })
              )}
          </div>
        </Memo>
      </SidePanel>
      {/* // ? ⬇️ Start page support components */}

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
    </Page>
  );
}
