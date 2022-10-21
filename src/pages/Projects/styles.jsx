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
  display:flex;
  flex-direction:column;
  gap:1.2rem;
  font-size:2rem;
  position: sticky;
  width: auto;
  padding: 1.2rem 0;
  color:red;
`

export const ItemList = styled.ul`
  display:flex;
  gap:1.2rem;
  flex-direction:column;
  font-size:2rem;
  overflow: scroll;
  height: ${({panelHeight})=>panelHeight?`calc(60vh - ${panelHeight}px)`:"none"};
  &::-webkit-scrollbar {
    display: none;
  }
`

export const Item = styled.a`
  display:flex;
  &.inner{
    padding-left: 1.2rem;
    display:${({show})=>show?"flex":"none"};
  }
  &:hover{
    color: blue;
  }
` 

export const Title = styled.h1`
  padding: 4rem;
  text-align: center;
  width: 100%;
  font-size: 6rem;
`

export const ImagesContainer = styled.div`
  display: flex;
  flex-direction: column wrap;
  flex-wrap: wrap;
  min-height: 30rem;
  max-width: 40%;
  justify-content: left;
  gap: 1.2rem;
  border-radius: 1rem;
  @media (max-width: 1360px) {
    max-width: 100%;
    justify-content: space-around;
  }
`

export const Image = styled.img`
  width: 100%;
  border-radius: 0.4rem;
  height: fit-content;
  object-fit: cover;
  object-position: center center;
  @media (max-width: 1360px) {
    width: 47%;
  }
  @media (max-width: 600px) {
    width: 100%;
  }
`

export const DescriptionsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  height: fit-content;
  gap: 3rem;
  width: 55%;
  padding: 5rem;
  background-color: ${({ even }) =>
    even ? 'rgba(228, 255, 26, .6)' : '#ff811a99'};
  border-radius: 1rem;
  @media (max-width: 1360px) {
    width: 100%;
  }
`

export const Description = styled.article`
  width: 100%;
  font-size: 2rem;
  text-align: left;
  @media (max-width: 830px) {
    width: 100%;
    font-size: 1.8rem;
  }
  @media (max-width: 480px) {
    width: 100%;
    font-size: 1.4rem;
  }
`

export const ProjectContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: ${({ even }) => (even ? 'row' : 'row-reverse')};
  justify-content: space-around;
  gap: 3rem;
  padding: 1rem;
  min-height: 40rem;
  width: 100%;
  @media (max-width: 1360px) {
    flex-direction: column;
    align-items: center;
  }
`
