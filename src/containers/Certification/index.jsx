import { Container, Image, Url, Dashboard } from './styles'
import { CertificationSkeleton } from './skeleton'
import { useNearScreen } from '../../hooks/useNearScreen'
import { useEffect } from 'react'
import { labelCases } from '../../utils'
import { DefineSchema } from '../../components/DefineSchema'
import { getContextValue, CONTEXTS } from '../../contexts'

export function Certification({
  title,
  src = '',
  setCurrentModal = () => {},
  updateRefs,
}) {
  const { token } = getContextValue(CONTEXTS.Global)
  const [show, ref] = useNearScreen(false, updateRefs)
  useEffect(() => {}, [show, ref, token])

  return (
    <Container ref={ref} id={labelCases(title).LS}>
      <Image
        src={src}
        onClick={() =>
          setCurrentModal(
            <Image
              zoomed={true}
              onClick={() => setCurrentModal(null)}
              src={src}
            />,
          )
        }
      ></Image>
      {token && (
        <Dashboard id="dashboard">
          <Url href="https://user-images.githubusercontent.com/41123597/192820954-929acdc8-5012-4a95-92fa-6f635aaef161.jpg">
            URL
          </Url>
          <button>Butoon1 </button>
          <button>Butoon1 </button>
        </Dashboard>
      )}
    </Container>
  )
}

export { CertificationSkeleton }
