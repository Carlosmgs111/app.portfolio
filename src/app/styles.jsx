import styled, { keyframes } from "styled-components";

export const Header = styled.header`
  font-size: 1.8rem;
  width: 100%;
  height: 10vh;
  justify-items: center;
  position: sticky;
  z-index: 1;
  top: 0;
  backdrop-filter: brightness(40%) blur(0.6rem);
  @media(max-width: 1360px){
    position:absolute;
    height: 18vh;
  }
  @media(max-width: 830px){
    height: 14vh;
  }
  @media(max-width: 480px){
    height: 12vh;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  position: relative;
  align-items: center;
  justify-content: center;
  top: 10vh;
  max-width: 100vw;
  min-height: 90vh;
  align-self: center;
  padding: 1rem 4vw 18vh 4vw;
  @media (max-width: 1360px) {
    padding: 10rem 4vw 18vh 4vw;
  }
  @media (max-width: 830px) {
    padding: 6rem 4vw 18vh 4vw;
  }
  @media (max-width: 480px) {
    padding: 6rem 1rem 18vh 1rem;
  }
`;

export const Footer = styled.footer`
  backdrop-filter: brightness(40%) blur(0.6rem);
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 20vh;
`;

export const Banner = styled.h1`
  color: hsl(67, 100%, 55%);
  font-weight: bold;
  font-size: 5.8rem;
  @media(max-width:480px){
    font-size: 3.8rem;
  }
`;

export const Icon = styled.i`
  top: 0;
  font-size:3.5rem;
  color: ${({ state }) =>
    !state ? "hsl(349.9, 95.7%, 36.4%)" : "hsl(140, 71%, 44%)"};
  -webkit-text-stroke: 1.5px black;
  border-radius: 6px;
  border: 1px solid black;
  padding: 3px;
  :hover{
    color:hsl(19, 97%, 51%);
  }
`;
