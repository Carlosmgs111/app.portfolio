import { Container, Content, Image, Url, Dashboard, Button } from './styles'
import { CertificationSkeleton } from './skeleton'
import { useNearScreen } from '../../hooks/useNearScreen'
import { useEffect } from 'react'
import { labelCases } from '../../utils'
import { DefineSchema } from '../../components/DefineSchema'
import { getContextValue, CONTEXTS } from '../../contexts'
import { runRequest } from '../../services/runRequest'
import { useState } from 'react'
import { useSwitch } from '../../hooks/useSwitch'
import { headers } from '../../services/configs'
import { runButtonBehavior } from '../../utils'

export function Certification({
  initialCertification,
  setCurrentModal = () => {},
  updateRefs,
  updateCertifications,
  institutions,
}) {
  const requestHeaders = headers()
  const [beingEdited, switchBeingEdited] = useSwitch(false, true)
  const [certification, setCertification] = useState(initialCertification)
  const { uuid, title, image = '', emitedAt, emitedBy, url } = certification
  const { token } = getContextValue(CONTEXTS.Global)
  const [show, ref] = useNearScreen(false, updateRefs)

  // ? closure function that return function that set the callback provided
  const onClickHandler = (cb) => {
    let onClickHandlerCallback = null
    return [
      (params) => (onClickHandlerCallback = cb(params)),
      () => onClickHandlerCallback,
    ]
  }

  // ? callback to be passed as parameter to setup function
  const defineSchemaCallback = (params) => () => {
    const { setError, setLoading, parsedSchema, reset } = params
    const toUpdate = {}
    console.log(parsedSchema[0])
    for (var attr in parsedSchema[0]) {
      console.log({ attr })
      if (parsedSchema[0][attr] !== certification[attr])
        toUpdate[attr] = parsedSchema[0][attr]
    }
    runRequest({
      setData: (data) => setCertification({ ...data }),
      setError,
      setLoading,
    }).patch(
      `certifications`,
      { ...toUpdate, uuid },
      {
        ...requestHeaders,
      },
    )
    reset()
    switchBeingEdited()
  }

  // ? function to set callback
  const [setOnClickHandler, getOnClickHandler] = onClickHandler(
    defineSchemaCallback,
  )

  const onClick = (e) => {
    const onClickHandlerCallback = getOnClickHandler()
    console.log({ onClickHandlerCallback })
    const behaviors = {
      primary: () => {
        beingEdited
          ? onClickHandlerCallback()
          : runRequest({
              setData: (data) => {
                console.log({ data })
                updateCertifications((certifications, setCertifications) => {
                  const newCertifications = certifications.filter(
                    (c) => c.uuid !== data.uuid,
                  )
                  console.log({ newCertifications })
                  setCertifications(newCertifications)
                })
              },
            }).delete(`certifications/${uuid}`, {
              ...requestHeaders,
            })
      },
      secondary: () => switchBeingEdited(),
    }
    runButtonBehavior(e, behaviors)
  }

  useEffect(() => {}, [show, ref, token])

  return (
    <Container ref={ref} id={labelCases(title).LS}>
      {!beingEdited ? (
        <Content>
          <Image
            src={image}
            onClick={() =>
              setCurrentModal(
                <Image
                  zoomed={true}
                  onClick={() => setCurrentModal(null)}
                  src={image}
                />,
              )
            }
          ></Image>
          <Url target="_blank" href={url} className="fa-solid fa-link"></Url>
        </Content>
      ) : (
        <DefineSchema
          {...{
            baseSchema: {
              title,
              emitedBy,
              // ? `{` symbol used for mark a select object controller
              'emitedBy{': institutions.map((i) => i.name),
              emitedAt,
              // ? `~` symbol used for mark a date object controller
              'emitedAt~': new Date().toISOString().slice(0, 10),
              image,
              url,
            },
            nonOptionals: ['title', 'emitedAt~', 'image', 'url', 'emitedBy{'],
            highOrderCallback: (params) => setOnClickHandler(params),
            buttons: [],
          }}
        ></DefineSchema>
      )}

      {token && (
        <Dashboard id="certification-dashboard">
          <Button
            className={beingEdited ? 'success' : 'danger'}
            id={uuid}
            name="primary"
            onClick={onClick}
          >
            {beingEdited ? (uuid ? 'Guardar' : 'Crear') : 'Eliminar'}
          </Button>
          <Button
            className="secondary"
            name="secondary"
            id={uuid}
            button="secondary"
            onClick={onClick}
          >
            {beingEdited ? (uuid ? 'Cancelar' : 'Limpiar') : 'Editar'}
          </Button>
        </Dashboard>
      )}
    </Container>
  )
}

export { CertificationSkeleton }
