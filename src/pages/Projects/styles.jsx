import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
`

export const MainContainer = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  padding-top: 20rem;
  gap: 10px;
  flex-wrap: wrap;
  width: calc(100% + 4vw);
  padding-left: 20rem;
  @media (max-width: 480px) {
    padding: 0.1rem;
  }
`
