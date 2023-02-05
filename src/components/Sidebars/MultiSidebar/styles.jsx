import styled from "styled-components";

export const FloatContainer = styled.div`
  position: sticky;
  top: 10rem;
  left: 0;
  height: 0;
  width: fit-content;
  z-index: 1;
`;

export const Sidebar = styled.div`
  border-radius: 0 0.6rem 0.6rem 0;
  backdrop-filter: blur(6px);
  border: solid transparent 1px;
  max-height: 70vh;
  height: fit-content;
  position: sticky;
  top: 10rem;
  left: 0;
  min-width: fit-content;
  padding: 0.8rem;
  display: flex;
  flex-direction: column;
  font-size: 2.8rem;
  justify-content: center;
  align-items: center;
  color: #fb5609;
  z-index: 1000;
  :hover {
    border: solid #00ffc8 1px;
  }
  transition: border 0.4s;
  &::before {
    content: "";
    border-radius: 0 0.6rem 0.6rem 0;
    background-color: #2b4e7933;
    box-shadow: 2px 2px 4px 2px #00000033;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
  }
`;

export const Body = styled.div`
  display: flex;
  column-gap: ${({ active }) => (active ? "0.8rem" : "0")};
  max-height: 64vh;
  transition: column-gap 0.4s;
`;
export const Header = styled.div`
  border-radius: 0.6rem;
  display: flex;
  flex-wrap: wrap;
  font-size: 1.4rem;
  font-weight: bold;
  height: 4vh;
  justify-content: space-around;
  width: 100%;
  /* backdrop-filter: brightness(60%); */
`;
export const Footer = styled.div`
  border-radius: 0.6rem;
  display: flex;
  flex-wrap: wrap;
  font-size: 1.6rem;
  height: 4vh;
  justify-content: space-around;
  align-items: center;
  /* backdrop-filter: brightness(60%); */
`;

export const Item = styled.a`
  cursor: pointer;
  text-decoration: none;
  display: flex;
  padding: 0.2rem;
  align-items: center;
  position: relative;
  direction: ltr;
  &:visited {
    color: unset;
  }
  &:hover {
    color: #f026df !important;
  }
  &.rotable {
    &:hover {
      transform: rotate(90deg);
    }
  }
  /* background-color: orangered; */
  color: ${({ active }) => (active ? "#e4ff1a" : "inherit")} !important;
  transition: transform 0.4s, max-width 0.6s, padding-right 0.4s, color 0.4s,
    left 0.6s, opacity 0.6s;
`;
