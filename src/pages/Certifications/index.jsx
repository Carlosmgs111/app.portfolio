import {
  Certification,
  CertificationSkeleton,
} from "../../containers/Certification";
import {
  PanelSidebar,
  innerItems,
} from "../../components/Sidebars/PanelSidebar";
import { Page } from "../../components/Page";
import { Banner } from "../../components/Banner";
import { MultiSidebar } from "../../components/Sidebars/MultiSidebar";
import { useState, useEffect, useReducer } from "react";
import { useTrackSidebar } from "../../hooks/useTrackSidebar";
import { OnLoading } from "../../components/OnLoading";
import { OnError } from "../../components/OnError";
import { Modal } from "../../components/Modal";
import { Main, Container, Dashboard } from "./styles";
import { DefineSchema } from "../../components/DefineSchema";
import {
  manyfy,
  injectAttrsToReactElements,
  normalize,
  settingName,
  setActions,
  getDispatchSetFunctions,
} from "../../utils";
import { getContextValue, CONTEXTS } from "../../contexts";
import { runRequest } from "../../services/runRequest";
import { headers } from "../../services/configs";
import { useSwitch } from "../../hooks/useSwitch";
import { Mapfy } from "../../utils";

export function Certifications() {
  const { token, username } = getContextValue(CONTEXTS.Global);
  const requestHeaders = headers();
  const [owned, switchOwned] = useSwitch(false, true);

  const initialState = {
    institutions: [],
    certifications: [],
    currentModal: null,
    loading: true,
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

  const { institutions, certifications, currentModal, loading, error } = state;

  const setFunctions = getDispatchSetFunctions(dispatch, actionTypes);

  const {
    setCertifications,
    setInstitutions,
    setCurrentModal,
    setLoading,
    setError,
  } = setFunctions;

  const [TrackSidebar, setElements, updateRefs] = useTrackSidebar({
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
  });

  const expSchema = {
    string: "",
    number: 0,
    enum: "",
    "enum{": ["Uno", "Dos"],
    empty: false,
  };

  const institutionSchema = {
    name: "",
    businessName: "",
    descriptions: [""],
    urls: [""],
  };

  const modals = {
    institutions: (
      <div style={{ position: "absolute", right: 0 }}>
        <h1>Hola</h1>
      </div>
    ),
    addCertification: (
      <Dashboard>
        <DefineSchema
          {...{
            title: "Add New Institution(s)",
            baseSchema: institutionSchema,
            nonOptionals: ["name", "businessName", "descriptions", "urls"],
            onClickHandler: ({ setError, setLoading, parsedSchema, reset }) => {
              runRequest({
                setData: (data) => setInstitutions([...institutions, ...data]),
                setError,
                setLoading,
              }).post(`institutions`, parsedSchema[0], {
                ...requestHeaders,
              });
              reset();
            },
          }}
        />
      </Dashboard>
    ),
  };

  Mapfy(modals).forEach(
    (modal, key) => (modals[key] = Object.assign({ modalName: key }, modal))
  );

  const switchModal = (currentModal, modal) => {
    if (!currentModal) return setCurrentModal(modal);
    const [currentModalName, modalName] = [
      currentModal.modalName,
      modal.modalName,
    ];
    if (currentModal && currentModalName !== modalName) setCurrentModal(modal);
    if (currentModalName === modalName) setCurrentModal(null);
  };

  const sidebars = [TrackSidebar];
  token &&
    sidebars.push(
      <PanelSidebar
        id="panel-sidebar"
        items={[
          {
            innerItem: innerItems.Input,
            className: "fa-solid fa-magnifying-glass",
            onChange: (e) =>
              console.log(
                certifications.filter((c) =>
                  c.title.toLowerCase().includes(e.target.value.toLowerCase())
                )
              ),
          },
          {
            innerItem: innerItems.Input,
            className: "fa-solid fa-filter",
            onChange: (e) =>
              setCertifications([
                ...certifications.map((c) => ({
                  ...c,
                  visible: normalize(c.title.toLowerCase()).includes(
                    e.target.value.toLowerCase()
                  ),
                })),
              ]),
          },
          {
            innerItem: innerItems.InnerItem,
            content: owned ? "Todas" : "Propias",
            className: owned ? "fa-solid fa-eye" : "fa-solid fa-eye-slash",
            onClick: () => {
              switchOwned();
              setCertifications([
                ...certifications.map((c) => ({
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
            content: "Agregar Diploma",
            className: "fa-solid fa-plus",
            href: "#dashboard",
            visibility: token,
            onClick: () => console.log("Agregar diploma"),
          },
          {
            innerItem: innerItems.InnerItem,
            content: "Agregar Institucion",
            className: "fa-solid fa-fingerprint",
            visibility: token,
            onClick: () => switchModal(currentModal, modals.addCertification),
          },
        ]}
      ></PanelSidebar>
    );

  const updateState = (cb) =>
    cb({
      state,
      dispatch,
      actionTypes,
      auxCallback: (data) => {
        console.log({ data });
        setElements(data.map((d) => d.title));
      },
      ...setFunctions,
    });

  useEffect(() => {
    runRequest({
      setData: async (data) => {
        setCertifications(data.map((d) => ({ ...d, visible: true })));
        setElements([...data.map((c) => c.title)]);
        await runRequest({
          setData: (data) => {
            setCertificationSchema({
              ...certificationSchema,
              emitedBy: data[0].name,
              "emitedBy{": data.map((i) => i.name),
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
    <Page>
      {/* // ? ⬇️ Start optionals components */}
      <Banner
        {...{
          config: {
            background: "linear-gradient(to right, #fdbb2d, #b21f1f, #1a2a6c)",
          },
        }}
      >
        Certifications
      </Banner>
      <MultiSidebar
        {...{
          sidebars,
        }}
      />
      {/* // ? ⬆️ End optionals components */}
      <Main>
        <Container>
          {certifications.map(
            (certification, index) =>
              certification.visible && (
                <Certification
                  {...{
                    key: certification.uuid,
                    initialCertification: certification,
                    updateRefs,
                    setCurrentModal,
                    updateState,
                    institutions,
                  }}
                />
              )
          )}
        </Container>
        {/* // ? ⬇️ Start main content support components */}
        {token && !loading && (
          <Dashboard
            id="dashboard" // style={{ backgroundColor: '#9fbe05' }}
          >
            <DefineSchema
              {...{
                title: "Add New Certifications(s)",
                baseSchema: !expSchema || certificationSchema,
                nonOptionals: [
                  "title",
                  "emitedAt~",
                  "image",
                  "url",
                  "emitedBy{",
                ],
                onClickHandler: (params) => {
                  const { setError, setLoading, parsedSchema, reset } = params;
                  runRequest({
                    setData: (data) => {
                      setCertifications([
                        ...certifications,
                        ...data.map((c) => ({ ...c, visible: true })),
                      ]);
                      setElements([
                        ...certifications.map((c) => c.title),
                        ...data.map((c) => c.title),
                      ]);
                    },
                    setError,
                    setLoading,
                  }).post(
                    `certifications/certifications`,
                    { certifications: parsedSchema },
                    {
                      ...requestHeaders,
                    }
                  );
                  reset();
                },
              }}
            />
          </Dashboard>
        )}
        {/* // ? ⬆️ End main content support components */}
      </Main>
      {/* // ? ⬇️ Start page support components */}
      <OnLoading
        {...{
          loading,
          component: Container,
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
          over: false,
          embedButton: (
            <i
              id="newNote"
              type="button"
              onClick={() => setCurrentModal(null)}
              className="far fa-times-circle embed-button"
            ></i>
          ),
        }}
      />
      {/* // ? ⬆️ End page support components */}
    </Page>
  );
}
