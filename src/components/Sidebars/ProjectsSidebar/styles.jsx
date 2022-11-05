import styled from 'styled-components'

export const Sidebar = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  height: 65vh;
  position: fixed;
  left: 0;
  min-width: 30px;
  padding: 1.2rem;
`

export const SidebarPanel = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 2rem;
  position: sticky;
  width: fit-content;
  padding: 1.2rem 0;
  color: red;
`

export const ItemList = styled.ul`
  display: flex;
  flex-direction: column;
  font-size: 2rem;
  overflow: scroll;
  color: black;
  height: ${({ panelHeight }) =>
    panelHeight ? `calc(60vh - ${panelHeight}px)` : 'none'};
  &::-webkit-scrollbar {
    display: none;
  }
`

export const Item = styled.a`
  cursor: hand;
  text-decoration: none;
  display: flex;
  padding: .8rem;
  align-items:center;
  position:relative;
  &:visited {
    color: unset;
  }
  &:hover {
    color: blue !important;
  }
  background-color: orangered;
  color: ${({ active }) => (active ? 'green' : 'inherit')} !important;
  transition: width 0.8s , color 0.4s;
`

export const InnerItem = styled.i`
  ${Item.componentStyle.rules}
  padding:0;
  text-transform: capitalize !important; /* // ! Don't works */
  font-style: normal;
  white-space: nowrap;
  width: ${({ show }) => (show ? '180px' : '0px')};
  position: relative;
  left: 1.2rem;
`
