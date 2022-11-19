import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  margin: 0;
  width: 100vw;
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
  padding-top: 20vh;
  padding-left: 20rem;
  @media (max-width: 480px) {
    padding: 0.1rem;
  }
  h1 {
    width: 100%;
    text-align: center;
    padding-bottom: 20rem;
  }
`
