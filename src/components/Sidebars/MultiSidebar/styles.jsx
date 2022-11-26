import styled from 'styled-components'

export const Sidebar = styled.div`
  border-radius: 0 0.6rem 0.6rem 0;
  background-color: #2b4e79;
  border: solid transparent 1px;
  max-height: 70vh;
  height: fit-content;
  position: sticky;
  top: 6rem;
  left: 0;
  min-width: auto;
  padding: 0.8rem;
  display: flex;
  flex-direction: column;
  font-size: 2.8rem;
  justify-content: center;
  align-items: center;
  color: hsl(19, 97%, 51%);
  z-index: 1000;
  :hover {
    border: solid #00ffc8 1px;
  }
  transition: border 0.4s;
`

export const Body = styled.div`
  display: flex;
  column-gap: ${({ active }) => (active ? '0.8rem' : '0')};
  max-height: 64vh;
  transition: column-gap 0.4s;
`
export const Header = styled.div`
  border-radius: 0.6rem;
  display: flex;
  flex-wrap: wrap;
  font-size: 1.4rem;
  font-weight: bold;
  height: 4vh;
  justify-content: space-around;
  width: 100%;
  /* backdrop-filter: brightness(60%); */
`
export const Footer = styled.div`
  border-radius: 0.6rem;
  display: flex;
  flex-wrap: wrap;
  font-size: 1.6rem;
  height: 4vh;
  justify-content: space-around;
  align-items: center;
  /* backdrop-filter: brightness(60%); */
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
  -webkit-text-stroke: 0.4px black;
  transition: transform 0.4s, max-width 0.6s, padding-right 0.4s, color 0.4s,
    left 0.6s, opacity 0.6s;
`
