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
  padding: 0 10rem;
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

export const Sidebar = styled.nav`
  left: 0;
  top: 10vh;
  position: fixed;
  @media (max-width: 1360px) {
    top: 14vh;
  }
  @media (max-width: 830px) {
    top: 10vh;
  }
`

export const List = styled.ul`
  border-radius: 0 0.6rem 0.6rem 0;
  height: fit-content;
  display: flex;
  position: relative;
  flex-wrap: wrap;
  padding: 1.8rem;
  gap: 1.5rem;
  width: 7rem;
  max-height: 60vh;
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(6rem);
`

const hidden = css`
  width: 0;
  opacity: 0;
`

const visible = css`
  opacity: 1;
  width: 220px;
`

const fade = ({ from, to }) => keyframes`
  from {
    ${from}
  }
  to{
    ${to}
  }
`

export const Item = styled.a`
  cursor: default;
  text-decoration: none;
  position: relative;
  display: flex;
  flex-direction: row;
  left: 0rem;
  font-size: 2.8rem;
  color: hsl(19, 97%, 51%);
  margin: auto;
  -webkit-text-stroke: 1.5px black;
  height: fit-content;
  input {
    ${hidden}
    animation: 1.5s ${fade({ from: visible, to: hidden })} ease;
  }
  :hover {
    input {
      ${visible}
      animation: 1.5s ${fade({ from: hidden, to: visible })} ease;
    }
  }
`

export const Input = styled.input`
  -webkit-text-stroke: 0.1px black;
  font-weight: normal;
  border-radius: 0.4rem;
  border: 0;
  outline: none;
  position: relative;
  left: 1rem;
  padding: 0 0.8rem;
`
