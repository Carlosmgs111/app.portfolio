import styled from 'styled-components'

export const Container = styled.div`
  margin: 0;
  width:100vw;
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
  width: calc(100% + 4vw);
  padding-left: 20rem;
  @media (max-width: 480px) {
    padding: 0.1rem;
  }
`

export const CertificationContainer = styled.div`
  display: flex;
  flex-direction: ${({ reverse }) => (reverse ? 'row-reverse' : 'row')};
  position: relative;
  min-height: 45rem;
  width: 100%;
`

export const InnerContain = styled.div`
  &.image {
    width: 35%;
  }
  &.contain {
    width: 65%;
  }
  height: 40rem;
  background-color: #dc58589d;
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
