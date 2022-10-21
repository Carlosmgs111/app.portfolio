import styled, {keyframes} from 'styled-components'

export const Container = styled.div`
  margin: 0;
  width:100vw;
  h1 {
    font-size: 10rem;
  }
`

export const Main = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  width: calc(100% + 4vw);
  padding-left: 20rem;
  @media (max-width: 480px) {
    padding: 0.1rem;
  }
`

export const SkillsContainer = styled.div`
  display: flex;
  flex-direction: ${({ reverse }) => (reverse ? 'row-reverse' : 'row')};
  position: relative;
  min-height: 45rem;
  width: 100%;
`

export const InnerContain = styled.div`
  &.image {
    width: 35%;
  }
  &.contain {
    width: 65%;
  }
  height: 40rem;
  background-color: #dc58589d;
`

export const Sidebar = styled.nav`
  left: 0;
  top: 10vh;
  width: fit-content;
  height: 70vh;
  background-color: rgba(0, 0, 0, 0.5);
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
  height: available;
  display: flex;
  flex-direction:column;
  position: relative;
  flex-wrap: nowrap;
  padding:1.8rem;
  gap: 1.5rem;
  width: fit-content;
  max-height: 70vh;
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(6rem);
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const fadein = keyframes`
  from {
      opacity:0;
  }
  to{ 
      opacity: 1;
  }
`;

export const fadeout = keyframes`
  from {
      opacity: 1;
  }
  to{
      opacity:0;
  }
`;

export const Item = styled.a`
  cursor: default;
  text-decoration:none;
  position: relative;
  display: flex;
  flex-direction: row;
  width: fit-content;
  justify-content: center;
  left: 0rem;
  font-size: 1.4rem;
  max-width:20rem;
  color: hsl(19, 97%, 51%);
  -webkit-text-stroke: .6px black;
  height: fit-content;
  input {
    opacity: 0;
    animation: 1.5s ${fadeout} ease;
  }
  :hover {
    input {
      opacity: 1;
      animation: 1.5s ${fadein} ease;
    }
  }
  
`;
