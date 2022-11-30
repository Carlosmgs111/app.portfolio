import styled from 'styled-components'

export const Main = styled.div`
  top: 20vh;
  position: sticky;
  display: flex;
  flex-direction: column;
`

export const Container = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  gap: 6rem;
  flex-wrap: wrap;
  padding: 10rem 20rem;
  width: 100%;
  @media (max-width: 700px) {
    padding: 0;
  }
`



export const Banner = styled.div`
  width: 100%;
  height: 30rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: sticky;
  top: -24rem;
  left: 0;
  z-index: 1;
  background: linear-gradient(to right, #fdbb2d, #b21f1f, #1a2a6c);
  h1 {
    text-align: center;
    font-size: 8rem;
    -webkit-text-stroke: 0.15rem black;
    color: #11111199;
  }
`

export const Button = styled.button`
  margin: auto;
`

export const Dashboard = styled.div`
  color: white;
  width: 100%;
  display: flex;
  height: fit-content;
  align-items: center;
  justify-content: space-around;
  backdrop-filter: brightness(60%);
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`
