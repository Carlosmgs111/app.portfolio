import {
  Container,
  Content,
  Image,
  Details,
  Url,
  Displacement,
  Dashboard,
  Button,
} from "./styles";
import { CertificationSkeleton } from "./skeleton";
import { useNearScreen } from "../../hooks/useNearScreen";
import { labelCases } from "../../utils";
import { DefineSchema, getHOCAndTrigger } from "../../components/DefineSchema";
import { getContextValue, CONTEXTS } from "../../contexts";
import { runRequest } from "../../services/runRequest";
import { useState } from "react";
import { useSwitch } from "../../hooks/useSwitch";
import { headers } from "../../services/configs";
import { runButtonBehavior } from "../../utils";
import { format } from "timeago.js";

export function Certification({
  initialCertification,
  setCurrentModal = () => {},
  refreshRefs,
  updateState,
  institutions,
}) {
  const requestHeaders = headers();
  const [beingEdited, switchBeingEdited] = useSwitch(false, true);
  const [details, switchDetails] = useSwitch(false, true);
  const [certification, setCertification] = useState(initialCertification);
  const {
    uuid,
    title,
    image = "",
    emitedAt,
    emitedBy,
    url,
    tags,
    grantedTo,
  } = certification;
  const { token, username } = getContextValue(CONTEXTS.Global);
  const [show, ref] = useNearScreen(false, refreshRefs);

  // ? 1️⃣ Define the callback to be passed as high order callback
  const updateCallback = (params) => {
    const { setError, setLoading, data, reset } = params;
    const toUpdate = {};
    for (var attr in data[0]) {
      if (data[0][attr] !== certification[attr])
        toUpdate[attr] = data[0][attr];
    }
    runRequest({
      setData: ({ updated }) => {
        if (updated) {
          const certificationUpdated = { ...certification, ...data[0] };
          setCertification(certificationUpdated);
          updateState(({ state, setElements, setCertifications }) => {
            const newCertifications = [...state.certifications];
            newCertifications.splice(
              newCertifications.findIndex(
                (c) => c.uuid === certificationUpdated.uuid
              ),
              1,
              certificationUpdated
            );
            // setCertifications([...newCertifications]); // ? to check
            setElements(newCertifications.map((d) => d.title));
          });
        }
      },
      setError,
      setLoading,
    }).patch(
      `certifications`,
      { ...toUpdate, uuid },
      {
        ...requestHeaders,
      }
    );
    reset();
    switchBeingEdited();
  };

  // ? 2️⃣ Function to obtain the provided callback as the high order callback to be passed to
  // ? DefineSchema component as argument 'hightOrderCallback' and its respective trigger
  const [highOrderCallback, HOCTrigger] = getHOCAndTrigger(updateCallback);

  const onClick = (e) => {
    const behaviors = {
      primary: () => {
        beingEdited
          ? HOCTrigger()
          : (() => {
              const result = window.confirm(
                `Are you sure you want to delete certification ${title}`
              );
              result &&
                runRequest({
                  setData: (data) => {
                    updateState(({ setCertifications, state, setElements }) => {
                      const newCertifications = [...state.certifications];
                      newCertifications.splice(
                        newCertifications.findIndex(
                          (c) => c.uuid === data.uuid
                        ),
                        1
                      );
                      setCertifications(newCertifications);
                      setElements(newCertifications.map((d) => d.title));
                    });
                  },
                }).delete(`certifications/${uuid}`, {
                  ...requestHeaders,
                });
            })();
      },
      secondary: switchBeingEdited,
    };
    runButtonBehavior(e, behaviors);
  };

  // useEffect(() => {}, [show, ref, token])

  return (
    <Container ref={ref} id={labelCases(title).LS}>
      {!beingEdited ? (
        <Content>
          <Image
            {...{
              details,
              src: image,
              onClick: () =>
                setCurrentModal(
                  <Image
                    zoomed={true}
                    onClick={() => setCurrentModal(null)}
                    src={image}
                  />
                ),
            }}
          ></Image>
          <Details {...{ details }}>
            <>
              <h2>Title</h2>
              <p>{title}</p>
            </>
            <>
              <h2>Emited By</h2>
              <p>{emitedBy}</p>
            </>
            <>
              <h2>Granted</h2>
              <p>{format(emitedAt)}</p>
            </>
          </Details>
          <Displacement
            {...{ className: "fa-solid fa-ellipsis", onClick: switchDetails }}
          />
          <Url target="_blank" href={url} className="fa-solid fa-link" />
        </Content>
      ) : (
        <DefineSchema
          {...{
            title: `Update ${title}`,
            baseSchema: {
              title,
              emitedBy,
              // ? `{` symbol used for mark a select object controller
              "emitedBy{": institutions.map((i) => i.name),
              emitedAt: new Date(emitedAt).getTime(),
              // ? `~` symbol used for mark a date object controller
              "emitedAt~": new Date(emitedAt).toISOString().slice(0, 10),
              image,
              tags,
              url,
            },
            nonOptionals: ["title", "emitedAt~", "image", "url", "emitedBy{"],
            highOrderCallback,
            buttons: [],
          }}
        ></DefineSchema>
      )}

      {token && username === grantedTo && (
        <Dashboard id="certification-dashboard">
          <Button
            className={beingEdited ? "success" : "danger"}
            id={uuid}
            name="primary"
            onClick={onClick}
          >
            {beingEdited ? (uuid ? "Guardar" : "Crear") : "Eliminar"}
          </Button>
          <Button
            className={beingEdited ? "danger" : "secondary"}
            name="secondary"
            id={uuid}
            button="secondary"
            onClick={onClick}
          >
            {beingEdited ? (uuid ? "Cancelar" : "Limpiar") : "Editar"}
          </Button>
        </Dashboard>
      )}
    </Container>
  );
}

export { CertificationSkeleton };
