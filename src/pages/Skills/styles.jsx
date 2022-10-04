import styled from 'styled-components'

export const Container = styled.div`
  margin: 0;
  h1 {
    font-size: 10rem;
  }
`

export const Main = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin: 0;
  padding: 0 0 0 20rem;
  @media (max-width: 480px) {
    padding: 0.1rem;
  }
`

export const CertificationContainer = styled.div`
  position: relative;
  min-height: 45rem;
  width: 100%;
  background-color: rgba(161, 63, 135, 0.5);
`

export const Sidebar = styled.nav`
  left: 0;
  top: 10vh;
  width: 20rem;
  height: 70vh;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  @media (max-width: 1360px) {
    top: 18vh;
  }
  @media (max-width: 830px) {
    top: 14vh;
  }
`
