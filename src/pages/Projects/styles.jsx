import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  position: sticky;
`

export const MainContainer = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  width: calc(100% + 4vw);
  @media (max-width: 480px) {
    padding: 0.1rem;
  }
`
