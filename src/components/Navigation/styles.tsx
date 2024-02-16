import styled, { css } from "styled-components";
import { Link as LinkRouter } from "react-router-dom";
import { setFrames } from "../../utils";

export const from = ({ selected }: any) => css`
  color: ${selected ? "#ffffff" : "#ffffffb8"};
`;

export const to = css`
  color: #ffffff;
`;

export const Item: any = styled.li`
  animation: 1.2s ${(props) => setFrames([to, from], props)} ease;
  color: ${({ className }: any) =>
    className?.includes("login") && "#e4ff1a !important"};
  z-index: 1;
  list-style: none;
  padding: 0;
  text-decoration: none;
  ${(props: any) => from(props)};
  font-size: 1.4rem;
  font-weight: 1000;
  font-family: "Quicksand", sans-serif;
  text-align: center;
  font-style: none !important;
  position: relative;
  align-items: center;
  justify-content: center;
  border-bottom: ${({ selected, id }: any) =>
    selected && id !== "nonMark" ? "solid #e4ff1a 1px" : "transparent"};
  top: ${({ selected, id }: any) =>
    selected && id !== "nonMark" ? "-6px" : "0"};
  transition: top 0.4s, border-bottom 0.8s;
  &:hover,
  &:focus {
    ${to};
    text-decoration: none;
    top: ${({ id }: any) => (id !== "nonMark" ? "-6px" : "0")};
    border-bottom: ${({ id }: any) =>
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
    font-size: 2.8rem;
  }
  @media (max-width: 480px) {
    font-size: 2.4rem;
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
