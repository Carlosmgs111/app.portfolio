import styled from 'styled-components'

export const Container = styled.div`
  margin: 0;
`

export const Section = styled.article`
  border: none;
  padding: 8rem 30rem;
  margin: 8rem 0;
  min-height: 80vh;
  height: auto;
  width: 100%;
  background-color: ${({ bgc }) => (bgc ? bgc : '#e1e1e1e5')};
  @media (max-width: 1360px) {
    padding: 8rem 14rem;
  }
  @media (max-width: 830px) {
    padding: 4rem 8rem;
  }
  @media (max-width: 480px) {
    padding: 4rem 2.4rem;
  }
`

export const Text = styled.p`
  font-size: 3.6rem;
  margin: 0;
  @media (max-width: 830px) {
    font-size: 2.6rem;
  }
  @media (max-width: 600px) {
    font-size: 2.2rem;
  }
  @media (max-width: 480px) {
    font-size: 2rem;
  }
`
