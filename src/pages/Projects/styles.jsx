import styled from 'styled-components'

export const Container = styled.div`
  /* width:99%; */
`

export const Title = styled.h1`
  padding: 4rem ;
  text-align: center;
  width: 100%;
  font-size: 6rem;
`

export const ImagesContainer = styled.div`
  display: flex;
  flex-direction: column wrap;
  flex-wrap: wrap;
  max-width: 40%;
  justify-content: left;
  gap:1.2rem;
  border-radius: 1rem;
  @media (max-width: 1360px) {
    max-width: 100%;
    justify-content:space-between;
  }
`

export const Image = styled.img`
  width: 100%;
  border-radius: .4rem;
  height: fit-content;
  object-fit: cover;
  object-position: center center;
  @media (max-width: 1360px) {
    width:47%;
  }
  @media (max-width: 600px) {
    width:100%;
  }
 
`

export const DescriptionsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  gap: 3rem;
  width: 55%;
  padding: 2rem;
  background-color: rgba(225, 225, 225, 0.7);
  border-radius: 1rem;
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
  /* border-radius: 1rem;
  border: 4px solid rgba(0, 0, 0, 0.5); */
  padding: 1rem;
  /* padding: 4rem 8rem; */
  min-height: 40rem;
  width: 100%;
  /* background-color: rgba(85, 25, 65, 0.5); */
  @media (max-width: 1360px) {
    flex-direction: column;
    align-items: center;
  }
`
