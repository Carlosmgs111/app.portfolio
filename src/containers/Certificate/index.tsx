import styles from "./styles.module.css";
import { CertificateSkeleton } from "./skeleton";
import { useNearScreen } from "../../hooks/useNearScreen";
import { labelCases } from "../../utils";
import { AsyncImage } from "loadable-image";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Memo } from "../../components/Memo";
// import { DefineSchema, getHOCAndTrigger } from "../../components/DefineSchema";
import {
  DefineForms,
  getHOCAndTrigger,
  INPUT_TYPES,
} from "../../components/DefineForms";
import { useStateValue } from "../../context";
import { runRequest } from "../../services/runRequest";
import { useEffect, useState } from "react";
import { useToggle } from "../../hooks/useToggle";
import { headers } from "../../services/configs";
import { runButtonBehavior } from "../../utils";
import { format } from "timeago.js";

export function Certificate({
  initialCertificate,
  setCurrentModal = () => {},
  updateState,
  institutions,
}: any) {
  const requestHeaders = headers();
  const [beingEdited, switchBeingEdited] = useToggle(false, true);
  const [details, switchDetails] = useToggle(false, true);
  const [certificate, setCertification] = useState(initialCertificate);
  const {
    uuid,
    title,
    image = "",
    emitedAt,
    emitedBy,
    url,
    tags,
    grantedTo,
  }: any = certificate;
  // const [{ token, username }]: any = useStateValue();
  const [showCertificate, toggleShowCertificate] = useToggle(false, true);
  const [ref]: any = useNearScreen(
    false,
    (_: any, show: any) => show && !showCertificate && toggleShowCertificate()
  ); // ? Use to lazy loading 💤⏳

  // ? 1️⃣ Define the callback to be passed as high order callback
  const updateCallback = (params: any) => {
    const { setError, setLoading, data, reset } = params;
    const toUpdate: any = {};
    for (var attr in data[0]) {
      if (data[0][attr] !== certificate[attr]) toUpdate[attr] = data[0][attr];
    }
    runRequest({
      setData: ({ updated }: any) => {
        if (updated) {
          const certificationUpdated = { ...certificate, ...data[0] };
          setCertification(certificationUpdated);
          updateState(({ state, dispatch }: any) => {
            const newCertificates = [...state.certificates];
            newCertificates.splice(
              newCertificates.findIndex(
                (c) => c.uuid === certificationUpdated.uuid
              ),
              1,
              certificationUpdated
            );
            dispatch({ certificates: [...newCertificates] }); // ? to check
          });
        }
      },
      setError,
      setLoading,
    }).patch(
      `certificates`,
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
  const [highOrderCallback, onClickHandler]: any =
    getHOCAndTrigger(updateCallback);

  const onClick = (e: any) => {
    const behaviors = {
      primary: () => {
        beingEdited
          ? onClickHandler()
          : (() => {
              const result = window.confirm(
                `Are you sure you want to delete certificate ${title}`
              );
              result &&
                runRequest({
                  setData: (data: any) => {
                    updateState(({ dispatch, state }: any) => {
                      const newCertifications = [...state.certificates];
                      newCertifications.splice(
                        newCertifications.findIndex(
                          (c) => c.uuid === data.uuid
                        ),
                        1
                      );
                      dispatch({ certificates: newCertifications });
                    });
                  },
                }).delete(`certificates/${uuid}`, {
                  ...requestHeaders,
                });
            })();
      },
      secondary: switchBeingEdited,
    };
    runButtonBehavior(e, behaviors);
  };

  useEffect(() => {
    setCertification(initialCertificate);
  }, [initialCertificate]);

  return (
    <Memo deps={[certificate, showCertificate, beingEdited, details]}>
      <div
        className={`${styles.container} ${
          showCertificate ? styles.visible : ""
        }`}
        ref={ref}
        id={labelCases(title).LS}
      >
        {!beingEdited ? (
          <div className={styles.content}>
            <LazyLoadImage
              {...{
                src: image,
                alt: title,
                className: styles.image,
                loader: <CertificateSkeleton />,
                style: {
                  opacity: !details ? 1 : 0,
                },

                onClick: () =>
                  setCurrentModal({
                    currentModal: (
                      <img
                        {...{
                          src: image,
                          alt: title,
                          className: `${styles.image} ${styles.zoomed}`,
                          onClick: () =>
                            setCurrentModal({ currentModal: null }),
                        }}
                      />
                    ),
                  }),
              }}
            ></LazyLoadImage>
            <div
              {...{
                className: styles.details,
                style: { opacity: details ? 1 : 0, zIndex: details ? 0 : -1 },
              }}
            >
              <h3>{title}</h3>
              <h4>Emited By</h4>
              <p>{emitedBy}</p>
              <h4>Emited At</h4>
              <p>{format(emitedAt)}</p>
            </div>
            <div>
              <a onClick={switchDetails}>
                <i className="fa-solid fa-circle-info" />
                &nbsp;Ver Más
              </a>
              <a target="_blank" rel="noreferrer" href={url}>
                <i className="fa-solid fa-up-right-from-square"></i>
                &nbsp;Consultar
              </a>
            </div>
          </div>
        ) : (
          <div className={styles.content}>
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
          </div>
        )}
        {/* {token && username === grantedTo && (
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
        )} */}
      </div>
    </Memo>
  );
}

export { CertificateSkeleton };
