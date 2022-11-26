import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  margin: 0;
  width: 100%;
  position: sticky;
`

export const Banner = styled.div`
  width: 100%;
  height: 30rem;
  background-image: url('https://img.freepik.com/vector-premium/plantilla-diseno-banner-fondo-abstracto-formas-geometricas-patrones-hexagonales-pequenos-puntos-ilustracion-vectorial-diseno-tecnologia-o-ciencia_73749-706.jpg?w=2000');
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  position: sticky;
  top: -20rem;
  z-index: 1;
  h1 {
    text-align: center;
    font-size: 8rem;
    align-content: center;
    color: #908f8fbd;
    -webkit-text-stroke: 0.15rem black;
  }
`

export const Main = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  padding-top:10rem;
  @media (max-width: 480px) {
    padding: 0.1rem;
  }
`
