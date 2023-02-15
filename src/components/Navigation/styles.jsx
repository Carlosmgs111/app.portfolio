import styled, { css, keyframes } from "styled-components";
import { Link as LinkRouter } from "react-router-dom";
import { setFrames } from "../../utils";

export const NavbarContainer = styled.div`
  overflow: scroll;
  height: fit-content;
  &::-webkit-scrollbar {
    display: none;
  }
  height: 8rem;
  display: inline;
  backdrop-filter: blur(10rem) brightness(80%);
`;

export const NavbarHeader = styled.div`
  justify-content: space-between;
  display: flex;
  flex-direction: row;
  @media (max-width: 830px) {
    width: 100%;
  }
`;

export const NavigateBar = styled.nav`
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  padding: 0 2vw;
  width: inherit;
  height: inherit;
  @media (max-width: 1360px) {
    flex-direction: column;
  }
`;

const fadeinshow = keyframes`
  from{
    opacity:0;
  }
  to{
    opacity:1;
  }
`;

export const ItemsList = styled.ul`
  color: transparent;
  font-size: 3rem;
  margin: 0;
  /* backdrop-filter: blur(10rem) brightness(0.4); */
  border-radius: 6px;
  /* max-height: ${({ showfixed }) => (showfixed ? "10rem" : "10rem")}; */
  transition: max-height 0.5s;
  font-size: 2.8rem;
  display: flex;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  height: inherit;
  align-content: center;
  justify-content: left;
  align-items: center;
  transition: max-height 0.4s;
  padding: 0 0.4rem;
  @media (max-width: 830px) {
    animation: 0.8s ${fadeinshow} ease;
    max-height: ${({ show }) => (show ? "40rem" : "0")};
    flex-direction: column;
    align-items: center;
    position: relative;
    top: 0;
    width: 100%;
  }
  @media (max-width: 480px) {
    width: 100%;
  }
`;

export const from = ({ selected }) => css`
  color: ${selected ? "#ffffff" : "#ffffffb8"};
`;

export const to = css`
  color: #ffffff;
`;

export const Item = styled.li`
  animation: 1.2s ${(props) => setFrames([to, from], props)} ease;
  z-index: 1;
  list-style: none;
  padding: 0;
  text-decoration: none;
  ${(props) => from(props)};
  font-size: 1.4rem;
  transition: font-size 0.4s;
  font-weight: 1000;
  font-family: "Quicksand", sans-serif;
  text-align: center;
  font-style: none !important;
  position: relative;
  align-items: center;
  justify-content: center;
  border-bottom: ${({ selected, id }) =>
    selected && id !== "nonMark" ? "solid #e4ff1a 1px" : "transparent"};
  top: ${({ selected, id }) => (selected && id !== "nonMark" ? "-6px" : "0")};
  transition: top 0.4s, border-bottom 0.8s;
  &:hover,
  &:focus {
    ${to};
    text-decoration: none;
    top: ${({ id }) => (id !== "nonMark" ? "-6px" : "0")};
    border-bottom: ${({ id }) =>
      id !== "nonMark" ? "solid #e4ff1a 1px" : "none"};
    animation: 1.2s ${(props) => setFrames([from, to], props)} ease;
  }
  padding: 1rem 0.8rem;
  &:hover {
    width: auto;
  }
  p {
    margin: 0;
  }
  @media (max-width: 830px) {
    width: fit-content;
  }
  @media (max-width: 480px) {
    font-size: 1.8rem;
  }
`;

export const Button = styled.i`
  display: none;
  color: white;
  @media (max-width: 830px) {
    display: block;
    right: 15px;
    top: 2rem;
    font-size: 4rem;
  }
  @media (max-width: 480px) {
    font-size: 3rem;
  }
`;

export const Banner = styled(LinkRouter)`
  ${Item.componentStyle.rules}
  &:hover {
    border-bottom: none;
  }
  margin: 0;
`;

export const Link = styled(LinkRouter)`
  ${Item.componentStyle.rules}
`;

export const SearchForm = styled.form``;

export const SearchIcon = styled.i`
  color: ${({ selected }) => (selected ? "#00deae" : "#ffffff")};
  transition: color 0.4s;
  font-weight: 1000;
  position: relative;
  right: 3rem;
`;

export const SearchInput = styled.input`
  background-color: transparent;
  border: none;
  outline: none;
  color: whitesmoke;
  padding: 0 1rem;
  border: solid white 1px;
  border-radius: 4rem;
  padding: 0.8rem 3rem 0.8rem 2rem;
  transition: border 0.4s, width 0.4s;
  width: 25rem;
  &:focus {
    border: solid #00deae 1px;
    width: 30rem;
  }
`;

export const SubmitSearch = styled.input`
  background-color: transparent;
  border: none;
  width: 0;
`;
