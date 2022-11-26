import styled from 'styled-components'

export const SidebarBody = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.6rem;
  overflow: scroll;
  color: black;
  border-radius: 0.6rem;
  /* background-color: orangered; */
  min-height: fit-content;
  direction: rtl;
  max-height: ${({ active }) => (active ? '60vh' : '0')};
  max-width: ${({ active }) => (active ? '25rem' : '0')};
  transition: max-height 0.4s, max-width 0.4s;
  box-shadow: inset 0px 0px 4px 2px rgba(0, 0, 0, 0.2);
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
  -webkit-text-stroke: 0.6px black;
  transition: max-width 0.6s, max-height 0.4s, padding-right 0.4s, color 0.4s,
    left 0.6s, opacity 0.6s;
`

export const InnerItem = styled.i`
  ${Item.componentStyle.rules}
  -webkit-text-stroke: .3px black;
  padding: 0;
  text-transform: capitalize !important; /* // ! Don't works */
  text-overflow: ellipsis;
  overflow: hidden;
  position: relative;
  font-size: 1.2rem;
  font-style: normal;
  white-space: pre-wrap;
  line-height: 2rem;
  left: ${({ show }) => (show ? '1.2rem' : '-180px')};
  opacity: ${({ show }) => (show ? '1' : '0')};
  max-width: ${({ show }) => (show ? '25rem' : '0')};
  max-height: ${({ show }) => (show ? '20rem' : '0')};
  padding-right: ${({ show }) => (show ? '1.2rem' : '0')};
`
