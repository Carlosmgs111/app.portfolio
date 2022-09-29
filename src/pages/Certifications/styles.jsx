import styled, { keyframes } from "styled-components";

export const Container = styled.div`
  top: 20vh;
  position: sticky;
  display: flex;
`;

export const Main = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  padding: 0 10rem;
  @media (max-width: 480px) {
    padding: 0.1rem;
  }
`;

export const Button = styled.button`
  margin: auto;
`;

export const Dashboard = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

export const Sidebar = styled.nav`
  left: 7rem;
  position: fixed;
`;

export const List = styled.ul`
border-radius: 0 .6rem .6rem 0;
  height: fit-content;
  display: flex;
  justify-content: center;
  position: relative;
  flex-wrap: wrap;
  gap: 2.5rem;
  top: -10.6rem;
  left: -7rem;
  width: 8rem;
  max-height: 60vh;
  padding: 2.5rem;
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(6rem);
  @media (max-width: 1360px) {
    top: -2.3rem;
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

export const Item = styled.i`
  position: relative;
  display: flex;
  flex-direction: row;
  left: 8.7rem; 
  font-size: 3rem;
  /* animation: 1s ${fadeout} ease; */
  color: hsl(19, 97%, 51%);
  -webkit-text-stroke: 1.5px black;
  height: fit-content;
  input{
    opacity:0
    animation: 1.5s ${fadeout} ease;
  }
  :hover{
    input{
      opacity:1;
      animation: 1.5s ${fadein} ease;
    }
  }
`;

export const Input = styled.input`
  border-radius: .4rem;
  border:0;
  outline:none;
  position:relative;
  opacity: 0;
  left:1rem;
  padding: 0 .8rem;
`;
