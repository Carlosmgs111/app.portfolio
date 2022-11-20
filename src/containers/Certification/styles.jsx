import styled from 'styled-components'

export const Container = styled.div`
  padding: 1.2rem;
  border-radius: 0.8rem;
  /* border: 1px solid black; */
  height: auto;
  min-width: 45rem;
  max-width: 45rem;
  min-height: 35rem;
  max-height: 45rem;
  backdrop-filter: blur(6px) brightness(80%);
  display: block;
  @media (max-width: 500px) {
    min-width: 32rem;
    max-width: 32rem;
  }
  &:hover {
    #dashboard {
      opacity: 1;
    }
  }
`

export const Image = styled.img`
  border-radius: 0.8rem;
  border: 0.4rem solid black;
  max-width: 100%;
  max-height: 80%;
  object-fit: cover;
  object-position: center center;
  cursor: ${({ zoomed }) => (zoomed ? 'zoom-out' : 'zoom-in')};
`

export const Url = styled.a``

export const Dashboard = styled.div`
  border-radius: 0 0 0.8rem 0.8rem;
  display: flex;
  justify-content: space-around;
  background-color: #2c2b2b56;
  position: fixed;
  bottom: 1.2rem;
  align-items: center;
  width: 100%;
  padding: 1.2rem 0;
  opacity: 0;
  transition: opacity 0.4s;
`
