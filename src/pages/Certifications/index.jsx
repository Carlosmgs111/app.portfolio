import {
  Certification,
  CertificationSkeleton,
} from '../../containers/Certification'
import { OnLoading } from '../../components/OnLoading'
import { OnError } from '../../components/OnError'
import { manyfy, injectAttrsToReactElements } from '../../utils'
import { Modal } from '../../components/Modal'
import { getContextValue, CONTEXTS } from '../../contexts'
import { DefineSchema } from '../../components/DefineSchema'
import { useState, useEffect } from 'react'
import { MultiSidebar } from '../../components/Sidebars/MultiSidebar'
import { PanelSidebar } from '../../components/Sidebars/PanelSidebar'
import { useTrackSidebar } from '../../hooks/useTrackSidebar'
import { Container, Main, Dashboard, Banner } from './styles'
import { runRequest } from '../../services/runRequest'
import { headers } from '../../services/configs'

export function Certifications() {
  const { token } = getContextValue(CONTEXTS.Global)
  const requestHeaders = headers()

  const [institutions, setInstitutions] = useState([])
  const [certifications, setCertifications] = useState([])
  const [currentModal, setCurrentModal] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [TrackSidebar, setElements, updateRefs] = useTrackSidebar()
  const [certificationSchema, setCertificationSchema] = useState({
    title: '',
    emitedBy: '',
    // ? `{` symbol used for mark a select object controller
    'emitedBy{': [],
    emitedAt: new Date().getTime(),
    // ? `~` symbol used for mark a date object controller
    'emitedAt~': new Date().toISOString().slice(0, 10),
    image: '',
    url: '',
  })

  const sidebars = [TrackSidebar]
  token &&
    sidebars.push(
      <PanelSidebar
        id="panel-sidebar"
        setCurrentModal={() => {
          setCurrentModal(
            <Dashboard>
              <DefineSchema
                {...{
                  setData: (data) =>
                    setCertifications([...certifications, ...data]),
                }}
              />
            </Dashboard>,
          )
        }}
      />,
    )

  const updateCertifications = (cb) => cb(certifications, setCertifications)

  useEffect(() => {
    runRequest({
      setData: (data) => {
        setCertifications(data)
        setElements([...data.map((project) => project.title)])
      },
      setError,
      setLoading,
    }).get('certifications')

    runRequest({
      setData: (data) => {
        setCertificationSchema({
          ...certificationSchema,
          emitedBy: data[0].name,
          'emitedBy{': data.map((i) => i.name),
        })
        setInstitutions(data)
      },
      setError,
      setLoading,
    }).get('institutions')

    return () => {}
  }, [token])

  return (
    <div style={{display:"flex", flexDirection:"column", alignItems:"left", justifyContent:"left"}}>
      <Banner>
        <h1>Certifications</h1>
      </Banner>
      <MultiSidebar
        {...{
          sidebars,
        }}
      />
      <Container>
        <Main>
          {certifications.map((certification, index) => (
            <Certification
              {...{
                key: certification.uuid,
                initialCertification: certification,
                updateRefs,
                setCurrentModal,
                updateCertifications,
                institutions,
              }}
            />
          ))}
          {token && !loading && (
            <Dashboard id="dashboard">
              <DefineSchema
                {...{
                  baseSchema: certificationSchema,
                  nonOptionals: [
                    'title',
                    'emitedAt~',
                    'image',
                    'url',
                    'emitedBy{',
                  ],
                  onClickHandler: (params) => {
                    const { setError, setLoading, parsedSchema, reset } = params
                    console.log({ parsedSchema })
                    runRequest({
                      setData: (data) =>
                        setCertifications([...certifications, ...data]),
                      setError,
                      setLoading,
                    }).post(
                      `certifications/certifications`,
                      { certifications: parsedSchema },
                      {
                        ...requestHeaders,
                      },
                    )
                    reset()
                  },
                }}
              />
            </Dashboard>
          )}
        </Main>
      </Container>
      <OnLoading
        {...{
          loading,
          component: Main,
          contain: manyfy(<CertificationSkeleton />, 12).map((c, index) =>
            injectAttrsToReactElements([c], { key: index }),
          ),
        }}
      />
      <OnError {...{ error }} />
      <Modal
        {...{
          active: false,
          injected: currentModal,
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
    </div>
  )
}
