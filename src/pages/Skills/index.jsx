import {
  Container,
  Sidebar,
  CertificationContainer,
  InnerContain,
  Main,
} from './styles'

const populate = () => {
  const certifications = []
  for (var i = 0; i < 10; i++) {
    certifications.push(
      <CertificationContainer reverse={i % 2 === 0}>
        <InnerContain
          className="image"
          style={{ 'background-color': '#5983ee9d' }}
        />
        <InnerContain className="contain" />
      </CertificationContainer>,
    )
  }
  return certifications
}

export function Skills() {
  return (
    <Container>
      <Sidebar></Sidebar>
      <Main>
        <h1>Skills</h1>
        {populate()}
      </Main>
    </Container>
  )
}
