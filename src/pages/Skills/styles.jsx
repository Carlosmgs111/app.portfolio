import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  margin: 0;
  width: 100%;
  position: sticky;
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
