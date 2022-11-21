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

export function Certification({
  certificate,
  setCurrentModal = () => {},
  updateRefs,
}) {
  const [beingEdited, switchBeingEdited] = useSwitch(false, true)
  const [certification, setCertification] = useState(certificate)
  const { uuid, title, image = '', emitedAt, emitedBy, url } = certification
  const { token } = getContextValue(CONTEXTS.Global)
  const [show, ref] = useNearScreen(false, updateRefs)

  const onClick = (e) => {
    if ((e.target.name || e.target.title) === 'secondary') {
      if (uuid) {
        switchBeingEdited()
      }
    }
    if ((e.target.name || e.target.title) === 'primary') {
      beingEdited
        ? uuid
          ? console.log('EDITING')
          : console.log('CREATING')
        : console.log('DELETING')
    }
  }

  useEffect(() => {}, [show, ref, token, certification])

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
          <Url href={url} className="fa-solid fa-link"></Url>
        </Content>
      ) : (
        <DefineSchema
          {...{
            baseSchema: {
              title,
              emitedBy,
              // ? `{` symbol used for mark a select object controller
              'emitedBy{': ['Platzi'],
              emitedAt,
              // ? `~` symbol used for mark a date object controller
              'emitedAt~': new Date().toISOString().slice(0, 10),
              image,
              url,
            },
            nonOptionals: ['title', 'emitedAt~', 'image', 'url', 'emitedBy{'],
            cb: ({ setError, setLoading, parseSchema, reset }) => {
              runRequest({
                setData: (data) => setCertification({ ...data }),
                setError,
                setLoading,
              }).patch(
                `certifications`,
                { ...parseSchema(false)[0], uuid },
                {
                  headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                  },
                },
              )
              reset()
            },
            buttons: ['save'],
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
            <i
              title="primary"
              id={uuid}
              className={
                beingEdited
                  ? uuid
                    ? 'fas fa-save' // to save
                    : 'fas fa-plus-square' // to create
                  : 'fas fa-trash-alt' // to delete
              }
            ></i>
          </Button>
          <Button
            className="secondary"
            name="secondary"
            id={uuid}
            button="secondary"
            onClick={onClick}
          >
            <i
              title="secondary"
              id={uuid}
              className={
                beingEdited
                  ? uuid
                    ? 'fas fa-ban' // to cancel
                    : 'fas fa-eraser' // to clean
                  : 'fas fa-edit' // to edit
              }
            ></i>
          </Button>
        </Dashboard>
      )}
    </Container>
  )
}

export { CertificationSkeleton }
