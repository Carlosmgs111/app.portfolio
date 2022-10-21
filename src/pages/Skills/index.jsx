import {
  Container,
  Sidebar,
  SkillsContainer,
  InnerContain,
  Main,
  List,
  Item,
} from './styles'

const populate = () => {
  const certifications = []
  for (var i = 0; i < 10; i++) {
    certifications.push(
      <SkillsContainer reverse={i % 2 === 0}>
        <InnerContain
          className="image"
          style={{ 'background-color': '#5983ee9d' }}
        >
          Imagen representativa de la habilidad
        </InnerContain>
        <InnerContain className="contain">
          Texto descriptivo de la habilidad
        </InnerContain>
      </SkillsContainer>,
    )
  }
  return certifications
}

export function Skills() {
  return (
    <Container>
      <Sidebar>
        <List>
          <Item id="1" href="#dashboard" className="fa-solid">
            Agregar
          </Item>
          <Item id="1" href="#dashboard" className="fa-solid fa-plus">
            Programacion orientada a objetos
          </Item>
          <Item id="1" href="#dashboard" className="fa-solid fa-plus">
            Agregar
          </Item>
          <Item id="1" href="#dashboard" className="fa-solid fa-plus">
            Agregar
          </Item>
          <Item id="1" href="#dashboard" className="fa-solid fa-plus">
            Agregar
          </Item>
          <Item id="1" href="#dashboard" className="fa-solid fa-plus">
            Agregar
          </Item>
          <Item id="1" href="#dashboard" className="fa-solid fa-plus">
            Agregar
          </Item>
          <Item id="1" href="#dashboard" className="fa-solid fa-plus">
            Agregar
          </Item>
          <Item id="1" href="#dashboard" className="fa-solid fa-plus">
            Agregar
          </Item>
          <Item id="1" href="#dashboard" className="fa-solid fa-plus">
            Agregar
          </Item>
          <Item id="1" href="#dashboard" className="fa-solid fa-plus">
            Agregar
          </Item>
          <Item id="1" href="#dashboard" className="fa-solid fa-plus">
            Agregar
          </Item>
          <Item id="1" href="#dashboard" className="fa-solid fa-plus">
            Agregar
          </Item>
          <Item id="1" href="#dashboard" className="fa-solid fa-plus">
            Agregar
          </Item>
          <Item id="1" href="#dashboard" className="fa-solid fa-plus">
            Agregar
          </Item>
          <Item id="1" href="#dashboard" className="fa-solid fa-plus">
            Agregar
          </Item>
          <Item id="1" href="#dashboard" className="fa-solid fa-plus">
            Agregar
          </Item>
          <Item id="1" href="#dashboard" className="fa-solid fa-plus">
            Agregar
          </Item>
          <Item id="1" href="#dashboard" className="fa-solid fa-plus">
            Agregar
          </Item>
          <Item id="1" href="#dashboard" className="fa-solid fa-plus">
            Agregar
          </Item>
          <Item id="1" href="#dashboard" className="fa-solid fa-plus">
            Agregar
          </Item>
          <Item id="1" href="#dashboard" className="fa-solid fa-plus">
            Agregar
          </Item>
          <Item id="1" href="#dashboard" className="fa-solid fa-plus">
            Agregar
          </Item>
          <Item id="1" href="#dashboard" className="fa-solid fa-plus">
            Agregar
          </Item>
        </List>
      </Sidebar>
      <Main>
        <h1>Skills</h1>
        {populate()}
      </Main>
    </Container>
  )
}
