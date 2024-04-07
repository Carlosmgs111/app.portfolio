import styles from "./styles.module.css";
import { CertificationSkeleton } from "./skeleton";
import { useNearScreen } from "../../hooks/useNearScreen";
import { labelCases } from "../../utils";
// import { DefineSchema, getHOCAndTrigger } from "../../components/DefineSchema";
import {
  DefineForms,
  getHOCAndTrigger,
  INPUT_TYPES,
} from "../../components/DefineForms";
import { getContextValue, CONTEXTS } from "../../contexts";
import { runRequest } from "../../services/runRequest";
import { useState } from "react";
import { useToggle } from "../../hooks/useToggle";
import { headers } from "../../services/configs";
import { runButtonBehavior } from "../../utils";
import { format } from "timeago.js";

export function Certification({
  initialCertification,
  setCurrentModal = () => {},
  refreshRefs,
  updateState,
  institutions,
}: any) {
  const requestHeaders = headers();
  const [beingEdited, switchBeingEdited] = useToggle(false, true);
  const [details, switchDetails] = useToggle(false, true);
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
  }: any = certification;
  const { token, username } = getContextValue(CONTEXTS.Global);
  const [show, ref]: any = useNearScreen(false, refreshRefs);

  // ? 1️⃣ Define the callback to be passed as high order callback
  const updateCallback = (params: any) => {
    const { setError, setLoading, data, reset } = params;
    const toUpdate: any = {};
    for (var attr in data[0]) {
      if (data[0][attr] !== certification[attr]) toUpdate[attr] = data[0][attr];
    }
    runRequest({
      setData: ({ updated }: any) => {
        if (updated) {
          const certificationUpdated = { ...certification, ...data[0] };
          setCertification(certificationUpdated);
          updateState(({ state, setElements, setCertifications }: any) => {
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
  const [highOrderCallback, HOCTrigger]: any = getHOCAndTrigger(updateCallback);

  const onClick = (e: any) => {
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
                  setData: (data: any) => {
                    updateState(
                      ({ setCertifications, state, setElements }: any) => {
                        const newCertifications = [...state.certifications];
                        newCertifications.splice(
                          newCertifications.findIndex(
                            (c) => c.uuid === data.uuid
                          ),
                          1
                        );
                        setCertifications(newCertifications);
                        setElements(newCertifications.map((d) => d.title));
                      }
                    );
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
    <div className={styles.container} ref={ref} id={labelCases(title).LS}>
      {!beingEdited ? (
        <div className={styles.content}>
          <img
            {...{
              src: image,
              alt: title,
              className: styles.image,
              style: { cursor: "zoom-in", opacity: !details ? 1 : 0 },
              onClick: () =>
                setCurrentModal(
                  <img
                    {...{
                      src: image,
                      alt: title,
                      className: styles.image,
                      style: { cursor: "zoom-out" },
                      onClick: () => setCurrentModal(null),
                    }}
                  />
                ),
            }}
          ></img>
          <div
            {...{
              className: styles.details,
              style: { opacity: details ? 1 : 0, zIndex: details ? 0 : -1 },
            }}
          >
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
          </div>
          <i
            {...{
              className: `fa-solid fa-ellipsis ${styles.displacement}`,
              onClick: switchDetails,
            }}
          />
          <a
            target="_blank"
            rel="noreferrer"
            href={url}
            className={`fa-solid fa-link ${styles.url}`}
          >
            {" "}
          </a>
        </div>
      ) : (
        <DefineForms
          {...{
            baseSchema: {
              title,
              emitedBy: {
                inputType: INPUT_TYPES.SELECTION,
                value: institutions.map((i: any) => i.name),
                controlledValue: emitedBy,
              },
              emitedAt: {
                inputType: INPUT_TYPES.DATE,
                label: "fecha",
                value: new Date(emitedAt).toISOString().slice(0, 10),
                controlledValue: new Date(emitedAt).getTime(),
              },
              image,
              tags,
              url,
            },
            modifiable: false,
            highOrderCallback,
          }}
        ></DefineForms>
      )}

      {token && username === grantedTo && (
        <div className={styles.dashboard}>
          <button
            className={`${styles.button} ${
              beingEdited ? styles.success : styles.danger
            }`}
            id={uuid}
            name="primary"
            onClick={onClick}
          >
            {beingEdited ? (uuid ? "Guardar" : "Crear") : "Eliminar"}
          </button>
          <button
            className={`${styles.button} ${
              beingEdited ? styles.danger : styles.secondary
            }`}
            name="secondary"
            id={uuid}
            onClick={onClick}
          >
            {beingEdited ? (uuid ? "Cancelar" : "Limpiar") : "Editar"}
          </button>
        </div>
      )}
    </div>
  );
}

export { CertificationSkeleton };
