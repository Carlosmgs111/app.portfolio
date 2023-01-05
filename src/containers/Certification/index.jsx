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
import { useEffect } from "react";
import { labelCases } from "../../utils";
import { DefineSchema } from "../../components/DefineSchema";
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
  updateRefs,
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
    grantedTo,
  } = certification;
  const { token, username } = getContextValue(CONTEXTS.Global);
  const [show, ref] = useNearScreen(false, updateRefs);

  // ? closure function that return function that set the callback provided
  const onClickHandler = (cb) => {
    let onClickHandlerCallback = null;
    return [
      (params) => (onClickHandlerCallback = cb(params)),
      () => onClickHandlerCallback,
    ];
  };

  // ? callback to be passed as parameter to setup function
  const defineSchemaCallback = (params) => () => {
    const { setError, setLoading, parsedSchema, reset } = params;
    const toUpdate = {};
    for (var attr in parsedSchema[0]) {
      if (parsedSchema[0][attr] !== certification[attr])
        toUpdate[attr] = parsedSchema[0][attr];
    }
    runRequest({
      setData: (data) => {
        setCertification({ ...data });
        updateState(({ state, auxCallback }) => {
          const newCertifications = state.certifications;
          auxCallback(
            newCertifications.map((c) => {
              if (c.uuid === data.uuid) c.title = title;
              return c;
            })
          );
          console.log({ newCertifications });
        });
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

  // ? function to set callback
  const [setOnClickHandler, getOnClickHandler] =
    onClickHandler(defineSchemaCallback);

  const onClick = (e) => {
    const onClickHandlerCallback = getOnClickHandler();
    const behaviors = {
      primary: () => {
        beingEdited
          ? onClickHandlerCallback()
          : (() => {
              const result = window.confirm(
                `Are you sure you want to delete certification ${title}`
              );
              result &&
                runRequest({
                  setData: (data) => {
                    updateState(({ setCertifications, state }) =>
                      setCertifications(
                        state.certifications.filter((c) => c.uuid !== data.uuid)
                      )
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
              url,
            },
            nonOptionals: ["title", "emitedAt~", "image", "url", "emitedBy{"],
            highOrderCallback: (params) => setOnClickHandler(params),
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
