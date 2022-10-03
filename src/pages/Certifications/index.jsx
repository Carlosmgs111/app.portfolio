import { Certification } from '../../components/Certification'
import { Modal } from '../../components/Modal'
import { getContext, CONTEXTS } from '../../contexts'
import { DefineSchema } from '../../components/DefineSchema'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { URL_API } from '../../services'
import {
  Container,
  Main,
  Button,
  Dashboard,
  Sidebar,
  List,
  Item,
  Input,
} from './styles'

export function Certifications() {
  const [{ useStateValue }, ACTIONS] = getContext(CONTEXTS.Global)
  const [{ token, loading: globalLoading }, dispatch] = useStateValue()
  const [institutions, setInstitutions] = useState([])
  const [certificates, setCertificates] = useState([])
  const [currentModal, setCurrentModal] = useState(null)
  const [loading, setLoading] = useState(true)
  const [certificationSchema, setCertificationSchema] = useState({
    title: '',
    emitedBy: "",
    // ? `{` symbol used for mark a select object controller
    'emitedBy{': [],
    emitedAt: new Date().getTime(),
    // ? `~` symbol used for mark a date object controller
    'emitedAt~': new Date().toISOString().slice(0, 10),
    image: '',
    url: '',
  })

  console.log({ token })

  useEffect(() => {
    const getCetifications = async () => {
      const { data } = await axios.get(`${URL_API}/certifications`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setCertificates(data)
    }
    const getInstitutions = async () => {
      const { data } = await axios.get(`${URL_API}/institutions`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setCertificationSchema({
        ...certificationSchema,
        emitedBy: data[0].name,
        'emitedBy{': data.map((i) => i.name),
      })
      setInstitutions(data)
      setLoading(false)
    }
    if (token) {
      getInstitutions()
      getCetifications()
    }
    /* setCertificates(certifications) */
    return () => {}
  }, [token])

  console.log({ certificates })
  return (
    <>
      <Container>
        <Sidebar>
          <List>
            <Item id="1" className="fa-solid fa-magnifying-glass">
              <Input></Input>
            </Item>
            <Item id="1" className="fa-solid fa-plus">
              <Input></Input>
            </Item>
            <Item id="1" className="fa-solid fa-eye">
              <Input></Input>
            </Item>
            <Item
              id="1"
              className="fa-solid fa-fingerprint"
              onClick={() => {
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
            ></Item>
          </List>
        </Sidebar>
        <Main>
          {certificates.map((certificate, index) => (
            <Certification
              setCurrentModal={setCurrentModal}
              src={certificate.image}
            />
          ))}
          {token && !loading && (
            <Dashboard>
              <DefineSchema
                {...{
                  baseSchema:certificationSchema,
                  nonOptionals: ["title", "emitedAt~", "image", "url", "emitedBy{"],
                  setData: (data) =>
                    setCertificates([...certificates, ...data]),
                }}
              />
            </Dashboard>
          )}
        </Main>
      </Container>
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
