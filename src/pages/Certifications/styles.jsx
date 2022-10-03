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
  color:white;
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
`;

export const Sidebar = styled.nav`
  left: 7rem;
  position: fixed;
`;

export const List = styled.ul`
  border-radius: 0 0.6rem 0.6rem 0;
  height: fit-content;
  display: flex;
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

export const Item = styled.a`
  cursor: default;
  text-decoration:none;
  position: relative;
  display: flex;
  flex-direction: row;
  left: 0rem;
  font-size: 3rem;
  color: hsl(19, 97%, 51%);
  -webkit-text-stroke: 1.5px black;
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

export const Input = styled.input`
  -webkit-text-stroke: 0.1px black;
  font-weight: normal;
  border-radius: 0.4rem;
  border: 0;
  outline: none;
  position: relative;
  opacity: 0;
  left: 1rem;
  padding: 0 0.8rem;
`;
