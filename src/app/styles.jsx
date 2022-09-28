import styled, { keyframes } from "styled-components";

export const Header = styled.header`
  font-size: 1.8rem;
  width: 100%;
  height: 10vh;
  justify-items: center;
  position: fixed;
  z-index: 1;
  top: 0;
  @media (max-width: 420px) {
    .navbar {
      /* display: none;
      border: none; */
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  position: relative;
  justify-content: center;
  top: 10vh;
  max-width: 100vw;
  min-height: 90vh;
  align-self: center;
  padding: 10rem 8vw 18vh 8vw;
  @media (max-width: 1060px) {
    padding: 12rem 8vw 18vh 8vw;
  }
  @media (max-width: 830px) {
    padding: 10rem 8vw 18vh 8vw;
  }
`;

export const Footer = styled.footer`
  backdrop-filter: brightness(40%) blur(0.6rem);
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 10vh;
`;

export const Banner = styled.h1`
  color: black;
  font-weight: bold;
  font-size: 5.8rem;
`;

export const Icon = styled.i`
  color: ${({ state }) =>
    state ? "hsl(350, 96%, 43%)" : "hsl(140, 71%, 44%)"};
  -webkit-text-stroke: 2px black;
  border-radius: 6px;
  border: 1px solid black;
  padding: 3px;
`;
