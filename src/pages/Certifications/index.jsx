import {
  Certification,
  CertificationSkeleton,
} from '../../containers/Certification'
import {
  PanelSidebar,
  innerItems,
} from '../../components/Sidebars/PanelSidebar'
import { Page } from '../../components/Page'
import { Banner } from '../../components/Banner'
import { MultiSidebar } from '../../components/Sidebars/MultiSidebar'
import { useState, useEffect } from 'react'
import { useTrackSidebar } from '../../hooks/useTrackSidebar'
import { OnLoading } from '../../components/OnLoading'
import { OnError } from '../../components/OnError'
import { Modal } from '../../components/Modal'
import { Main, Container, Dashboard } from './styles'
import { DefineSchema } from '../../components/DefineSchema'
import { manyfy, injectAttrsToReactElements, normalize } from '../../utils'
import { getContextValue, CONTEXTS } from '../../contexts'
import { runRequest } from '../../services/runRequest'
import { headers } from '../../services/configs'

export function Certifications() {
  const { token } = getContextValue(CONTEXTS.Global)
  const requestHeaders = headers()

  const [institutions, setInstitutions] = useState([])
  const [certifications, setCertifications] = useState([])
  const [visibleCertifications, setVisibleCertifications] = useState([])
  const [currentModal, setCurrentModal] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [TrackSidebar, setElements, updateRefs] = useTrackSidebar({
    innerItems: false,
  })
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

  const expSchema = {
    string: '',
    number: 0,
    enum: '',
    'enum{': ['Uno', 'Dos'],
    empty: false,
  }

  const instititionSchema = {
    name: '',
    businessName: '',
    descriptions: [],
    urls: [],
  }

  const sidebars = [TrackSidebar]
  // token &&
  sidebars.push(
    <PanelSidebar
      id="panel-sidebar"
      items={[
        {
          innerItem: innerItems.Input,
          className: 'fa-solid fa-magnifying-glass',
          onChange: (e) =>
            console.log(
              certifications.filter((c) =>
                c.title.toLowerCase().includes(e.target.value),
              ),
            ),
        },
        {
          innerItem: innerItems.Input,
          className: 'fa-solid fa-eye',
          onChange: (e) =>
            setVisibleCertifications([
              ...certifications.filter((c) =>
                normalize(c.title.toLowerCase()).includes(e.target.value),
              ),
            ]),
        },
        {
          innerItem: innerItems.InnerItem,
          content: 'Ver Instituciones',
          className: 'fa-solid fa-building-columns',
          onClick: () =>
            !currentModal
              ? setCurrentModal(
                  <div style={{ position: 'absolute', right: 0 }}>
                    <h1>Hola</h1>
                  </div>,
                )
              : setCurrentModal(null),
        },
        {
          innerItem: innerItems.InnerItem,
          content: 'Agregar Diploma',
          className: 'fa-solid fa-plus',
          href: '#dashboard',
          visibility: token,
          onClick: () => console.log('Agregar diploma'),
        },
        {
          innerItem: innerItems.InnerItem,
          content: 'Agregar Institucion',
          className: 'fa-solid fa-fingerprint',
          visibility: token,
          onClick: () =>
            !currentModal
              ? setCurrentModal(
                  <Dashboard>
                    <DefineSchema
                      {...{
                        title: 'Add New Institution(s)',
                        baseSchema: instititionSchema,
                        nonOptionals: [
                          'name',
                          'businessName',
                          'descriptions',
                          'urls',
                        ],
                        onClickHandler: ({
                          setError,
                          setLoading,
                          parsedSchema,
                          reset,
                        }) => {
                          runRequest({
                            setData: (data) =>
                              setInstitutions([...institutions, ...data]),
                            setError,
                            setLoading,
                          }).post(`institutions`, parsedSchema[0], {
                            ...requestHeaders,
                          })
                          reset()
                        },
                      }}
                    />
                  </Dashboard>,
                )
              : setCurrentModal(null),
        },
      ]}
    ></PanelSidebar>,
  )

  const updateCertifications = (cb) =>
    cb(certifications, setCertifications, setVisibleCertifications)

  useEffect(() => {
    runRequest({
      setData: (data) => {
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

        setCertifications(data)
        setVisibleCertifications(data)
        setElements([...data.map((project) => project.title)])
      },
      setError,
      setLoading,
    }).get('certifications')

    return () => {}
  }, [token])

  return (
    <Page>
      {/* // ? ⬇️ Start optionals components */}
      <Banner
        {...{
          config: {
            background: 'linear-gradient(to right, #fdbb2d, #b21f1f, #1a2a6c)',
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
          {visibleCertifications.map((certification, index) => (
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
        </Container>
        {/* // ? ⬇️ Start main content support components */}
        {token && !loading && (
          <Dashboard
            id="dashboard" // style={{ backgroundColor: '#9fbe05' }}
          >
            <DefineSchema
              {...{
                title: 'Add New Certifications(s)',
                baseSchema: !expSchema || certificationSchema,
                nonOptionals: [
                  'title',
                  'emitedAt~',
                  'image',
                  'url',
                  'emitedBy{',
                ],
                onClickHandler: (params) => {
                  const { setError, setLoading, parsedSchema, reset } = params
                  runRequest({
                    setData: (data) => {
                      setCertifications([...certifications, ...data])
                      setVisibleCertifications([...certifications, ...data])
                    },
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
        {/* // ? ⬆️ End main content support components */}
      </Main>
      {/* // ? ⬇️ Start page support components */}
      <OnLoading
        {...{
          loading,
          component: Container,
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
      {/* // ? ⬆️ End page support components */}
    </Page>
  )
}
