import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
`

export const MainContainer = styled.div`
  width: 80vw;
`

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
  gap: 1.2rem;
  font-size: 2rem;
  position: sticky;
  width: auto;
  padding: 1.2rem 0;
  color: red;
`

export const ItemList = styled.ul`
  display: flex;
  gap: 1.2rem;
  flex-direction: column;
  font-size: 2rem;
  overflow: scroll;
  color:black;
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
  &:visited {
    color: unset;
  }
  &:hover {
    color: blue;
  }
`
export const InnerItem = styled.i`
  ${Item.componentStyle.rules}
  font-style: normal;
  color: black;
  padding-left: 1.2rem;
  display: ${({ show }) => (show ? 'flex' : 'none')};
`