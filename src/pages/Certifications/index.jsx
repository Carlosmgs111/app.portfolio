import {
  Certification,
  CertificationSkeleton,
} from '../../containers/Certification'
import { OnLoading } from '../../components/OnLoading'
import { OnError } from '../../components/OnError'
import { manyfy } from '../../utils'
import { Modal } from '../../components/Modal'
import { getContextValue, CONTEXTS } from '../../contexts'
import { DefineSchema } from '../../components/DefineSchema'
import { useState, useEffect } from 'react'
import { MultiSidebar } from '../../components/Sidebars/MultiSidebar'
import { PanelSidebar } from '../../components/Sidebars/PanelSidebar'
import { useTrackSidebar } from '../../hooks/useTrackSidebar'
import { Container, Main, Dashboard } from './styles'
import { fetchData, methods } from '../../services/fetchData'

export function Certifications() {
  const { token } = getContextValue(CONTEXTS.Global)

  const [institutions, setInstitutions] = useState([])
  const [certificates, setCertificates] = useState([])
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
                    setCertificates([...certificates, ...data]),
                }}
              />
            </Dashboard>,
          )
        }}
      />,
    )

  useEffect(() => {
    fetchData({
      setData: (data) => {
        setCertificates(data)
        setElements([...data.map((project) => project.title)])
      },
      setError,
      setLoading,
    }).get('certifications')

    fetchData({
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
    <>
      <Container>
        <MultiSidebar
          {...{
            sidebars,
          }}
        />
        <Main>
          {certificates.map((certificate, index) => (
            <Certification
              updateRefs={updateRefs}
              title={certificate.title}
              setCurrentModal={setCurrentModal}
              src={certificate.image}
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
                  cb: ({ setError, setLoading, parseSchema, reset }) => {
                    fetchData({
                      setData: (data) =>
                        setCertificates([...certificates, ...data]),
                      setError,
                      setLoading,
                    }).post(
                      `certifications/certifications`,
                      { certifications: parseSchema(false) },
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
          contain: manyfy(<CertificationSkeleton />, 12),
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
    </>
  )
}
