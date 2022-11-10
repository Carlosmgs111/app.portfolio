import styled from 'styled-components'

export const Sidebar = styled.div`
  border-radius: 0 0.6rem 0.6rem 0;
  background-color: rgba(0, 0, 0, 0.5);
  max-height: 70vh;
  position: fixed;
  top: 10vh;
  left: 0;
  min-width: 30px;
  padding: 1.4rem;
  font-size: 2.4rem;
  justify-content: center;
  align-items: center;
  color: hsl(19, 97%, 51%);
`

export const Body = styled.div`
  display: flex;
  max-height: 60vh;
`
export const Header = styled.div`
  display: flex;
  flex-wrap: wrap;
  font-size: 1rem;
  font-weight: bold;
  height: 4vh;
  justify-content: space-around;
`
export const Footer = styled.div`
  display: flex;
  flex-wrap: wrap;
  font-size: 1.8rem;
  height: 4vh;
  justify-content: space-around;
  align-items: center;
`

export const Item = styled.a`
  cursor: pointer;
  text-decoration: none;
  display: flex;
  padding: 0.2rem;
  align-items: center;
  position: relative;
  direction: ltr;
  &:visited {
    color: unset;
  }
  &:hover {
    color: rgb(240, 38, 223) !important;
  }
  &.rotable {
    &:hover {
      transform: rotate(90deg);
    }
  }
  /* background-color: orangered; */
  color: ${({ active }) =>
    active ? 'hsl(67, 100%, 55%)' : 'inherit'} !important;
  -webkit-text-stroke: 0.2px black;
  transition: transform 0.4s, max-width 0.6s, padding-right 0.4s, color 0.4s,
    left 0.6s, opacity 0.6s;
`
