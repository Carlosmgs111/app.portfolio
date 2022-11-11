import { Container, Image, Url, Dashboard } from './styles'
import { CertificationSkeleton } from './skeleton'
import { useNearScreen } from '../../hooks/useNearScreen'
import { useEffect } from 'react'
import { labelCases } from '../../utils'

export function Certification({
  title,
  src = '',
  setCurrentModal = () => {},
  updateRefs,
}) {
  const [show, ref] = useNearScreen(false, updateRefs)
  useEffect(() => {}, [show, ref])

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
      {/* <Dashboard>
        <Url href="https://user-images.githubusercontent.com/41123597/192820954-929acdc8-5012-4a95-92fa-6f635aaef161.jpg">
          URL
        </Url>
      </Dashboard> */}
    </Container>
  )
}

export { CertificationSkeleton }
