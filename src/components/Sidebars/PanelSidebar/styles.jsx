import styled from 'styled-components'

export const SidebarBody = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 2rem;
  position: sticky;
  width: fit-content;
  max-height: 65vh;
  margin: 0 0 1.2rem 0;
  -webkit-text-stroke: 1.5px black;
  border-radius: 0.2rem;
  overflow: scroll;
  direction: rtl;
  &::-webkit-scrollbar {
    width: 0.4rem;
    display: inside;
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: black;
  }
  &::-webkit-scrollbar:horizontal {
    display: none;
  }
`

export const Item = styled.a`
  cursor: hand;
  text-decoration: none;
  display: flex;
  padding: 0.8rem;
  align-items: center;
  position: relative;
  direction: ltr;
  &:visited {
    color: unset;
  }
  &:hover {
    color: rgb(240, 38, 223) !important;
  }
  /* background-color: orangered; */
  color: ${({ active }) =>
    active ? 'hsl(67, 100%, 55%)' : 'inherit'} !important;
  -webkit-text-stroke: 1px black;
  transition: max-width 0.6s, padding-right 0.4s, color 0.4s, left 0.6s,
    opacity 0.6s;
`

export const InnerItem = styled.i`
  ${Item.componentStyle.rules}
  -webkit-text-stroke: none;
  padding: 0;
  text-transform: capitalize !important; /* // ! Don't works */
  position: relative;
  font-style: normal;
  white-space: nowrap;
  left: ${({ show }) => (show ? '1.2rem' : '-180px')};
  opacity: ${({ show }) => (show ? '1' : '0')};
  max-width: ${({ show }) => (show ? '180px' : '0')};
  padding-right: ${({ show }) => (show ? '1.2rem' : '0')};
`