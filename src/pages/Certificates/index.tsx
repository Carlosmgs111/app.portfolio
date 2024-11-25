import { Certificate, CertificateSkeleton } from "../../containers/Certificate";
import { PanelSidebar, innerItems } from "../../components/PanelSidebar";
import { manyfy, injectAttrsToReactElements, normalize } from "../../utils";
import { Page } from "../../components/Page";
import { SidePanel } from "../../components/SidePanel";
import { useState, useEffect, useMemo } from "react";
import { useTrackSidebar } from "../../hooks/useTrackSidebar";
import { Modal } from "../../components/Modal";
import styles from "./styles.module.css";
import { useStateValue } from "../../context";
import { runRequest } from "../../services/runRequest";
import { useToggle } from "../../hooks/useToggle";
import { Mapfy } from "../../utils";
import { addCertificate, addInstitution } from "./sections";
import { INPUT_TYPES } from "../../components/DefineForms";
import Helmet from "react-helmet";
import { Memo } from "../../components/Memo";
import { useReduceState } from "../../hooks/useReduceState";

export function Certificates({}: any) {
  const [
    {
      token,
      username,
      certificates: globalCertificates,
      institutions: globalInstitutions,
    },
    globalDispatch,
  ]: any = useStateValue();

  const [owned, switchOwned] = useToggle(false, true);
  const initialState = {
    institutions: globalInstitutions,
    certificates: globalCertificates,
    currentModal: null,
    loading: false,
    error: null,
  };
  const [state, dispatch] = useReduceState(initialState);
  const { institutions, certificates, currentModal, loading, error } = state;
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
    addCertification: addCertificate({
      certificationSchema,
      dispatch,
      certificates,
    }),
    addInstitution: addInstitution({
      institutionSchema,
      dispatch,
      institutions,
    }),
  };

  Mapfy(modals).forEach(
    (modal: any, key) =>
      (modals[key] = Object.assign({ modalName: key }, { ...modal }))
  );

  const switchModal = (currentModal: any, modal: any) => {
    if (!currentModal) return dispatch({ currentModal: modal });
    const [currentModalName, modalName] = [
      currentModal.modalName,
      modal.modalName,
    ];
    if (currentModal && currentModalName !== modalName)
      dispatch({ currentModal: { ...modal } });
    if (currentModalName === modalName) dispatch({ currentModal: null });
  };

  let items: any = [
    {
      innerItem: innerItems.Input,
      className: "fa-solid fa-magnifying-glass",
      onChange: (e: any) =>
        console.log(
          certificates.filter((c: any) =>
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
        dispatch({
          certificates: [
            ...certificates.map((c: any) => ({
              ...c,
              visible: isIncluded(c) || isTagIncluded(c),
            })),
          ],
        });
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
          dispatch({
            certificates: [
              ...certificates.map((c: any) => ({
                ...c,
                visible: owned || c.grantedTo === username,
              })),
            ],
          });
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

  const sidebars = [<TrackSidebar icon="fa-solid fa-award" />];
  if (token)
    sidebars.push(
      <PanelSidebar id="panel-sidebar" items={items}></PanelSidebar>
    );

  const updateState = (cb: Function) =>
    cb({
      state,
      dispatch,
    });

  useEffect(() => {
    !certificates[0] &&
      runRequest({
        setData: async (data: any) => {
          dispatch({
            certificates: data.map((d: any) => ({ ...d, visible: true })),
          });
          await runRequest({
            setData: (data: any) => {
              dispatch({ institutions: data });
            },
            setError: (error: any) => dispatch({ error }),
            setLoading: (loading: any) => dispatch({ loading }),
          }).get("institutions");
        },
        setError: (error: any) => dispatch({ error }),
        setLoading: (loading: any) => dispatch({ loading }),
      }).get("certificates" /* , { ...requestHeaders } */);

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
    globalDispatch({ certificates, institutions });
  }, [certificates, institutions]);

  return (
    <Page>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Certificates &bull; Carlos Muñoz Gachancipá</title>
      </Helmet>
      <SidePanel
        {...{
          // width: "240px",
          float: false,
          multi: false,
          sidebars,
        }}
      >
        <Memo deps={[certificates, loading]}>
          {(() => console.log("RENDERING CERTIFICATES"))()}
          <div className={styles.main_container}>
            {!loading && (
              <ContentWrapper>
                {certificates.map((certificate: any, index: number) => (
                  <Certificate
                    key={certificate.uuid}
                    {...{
                      id: certificate.uuid,
                      title: certificate.title,
                      initialCertificate: certificate,
                      setCurrentModal: dispatch,
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
                  <CertificateSkeleton />
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
          setInjected: dispatch,
          over: !false,
          embedbutton: (
            <i
              onClick={() => dispatch({ currentModal: null })}
              className="fa-solid fa-xmark"
            ></i>
          ),
        }}
      />
    </Page>
  );
}
