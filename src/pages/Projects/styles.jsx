import styled from 'styled-components'

export const Container = styled.div`
  /* width:99%; */
`

export const Title = styled.h1`
  text-align: center;
  width: 100%;
  font-size: 4rem;
`

export const Image = styled.img`
  border-radius: 0.2rem;
  max-width: 40%;
  height:fit-content;
  object-fit: cover;
  object-position: center center;
  @media (max-width: 1360px) {
    max-width: 80%;
  }
  @media (max-width: 830px) {
    max-width: 100%;
  }
`

export const DescriptionsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  gap: 3rem;
  width: 55%;
  @media (max-width: 1360px) {
    width: 100%;
  }
`

export const Description = styled.article`
  width: 100%;
  font-size: 2.4rem;
  text-align: left;
  @media (max-width: 830px) {
    width: 100%;
    font-size: 1.8rem;
  }
  @media (max-width: 480px) {
    width: 100%;
    font-size: 1.4rem;
  }
`

export const ProjectContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  gap: 3rem;
  padding: 4rem 8rem;
  min-height: 40rem;
  width: 100%;
  background-color: rgba(85, 25, 65, 0.5);
  @media (max-width: 1360px) {
    flex-direction: column;
    align-items: center;
  }
  @media (max-width: 480px) {
    padding: 1rem 2rem;
  }
`
