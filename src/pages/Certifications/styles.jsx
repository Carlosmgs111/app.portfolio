import { setFrames } from '../../utils'
import styled, { keyframes, css } from 'styled-components'

export const Container = styled.div`
  top: 20vh;
  position: sticky;
  display: flex;
`

export const Main = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  padding-top: 20rem;
  @media (max-width: 700px) {
    padding: 0;
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
