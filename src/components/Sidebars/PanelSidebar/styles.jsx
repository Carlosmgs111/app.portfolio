import styled, { css } from "styled-components";
import { setFrames } from "../../../utils";

export const SidebarBody = styled.div`
  border-radius: 0.6rem;
  display: flex;
  flex-direction: column;
  overflow: scroll;
  min-height: fit-content;
  direction: rtl;
  font-size: 1.6rem;
  max-height: ${({ active }) => (active ? "60vh" : "0")};
  max-width: ${({ active }) => (active ? "260px" : "0")};
  transition: max-height 0.4s, max-width 0.4s, padding-right 0.4s;
  box-shadow: inset 0px 0px 4px 2px rgba(0, 0, 0, 0.2);
  &::-webkit-scrollbar {
    width: 0.4rem;
    display: inside;
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: black;
  }
  &::-webkit-scrollbar:horizontal {
    display: none;
  }
`;

export const Item = styled.a`
  cursor: default;
  text-decoration: none !important;
  position: relative;
  display: flex;
  flex-direction: row;
  padding: 0.8rem;
  left: 0;
  color: #fb5609;
  direction: ltr;
  height: fit-content;
  &:visited {
    color: unset;
  }
  &:hover {
    color: #f026df !important;
  }
  /* background-color: #cadf2b; */
  color: ${({ active }) => (active ? "#e4ff1a" : "inherit")} !important;
  transition: max-width 0.6s, max-height 0.4s, margin-right 0.4s, color 0.4s,
    left 0.6s, opacity 0.6s;

  :hover {
    input {
      width: 18rem;
      opacity: 1;
      padding: 0 0.8rem;
      margin-right: 1rem;
    }
    i {
      left: 1.2rem;
      opacity: 1;
      max-width: 25rem;
      max-height: 1.5rem;
      margin-right: 1.2rem;
    }
  }
`;

export const Input = styled.input`
  float: right;
  font-family: "Quicksand" !important;
  text-transform: capitalize;
  -webkit-text-stroke: 0.1px black;
  font-weight: normal;
  height: 2.2rem;
  border: 0;
  outline: none;
  position: sticky;
  left: 1rem;
  width: 0;
  opacity: 0;
  padding: 0;
  transition: width 0.5s, opacity 0.5s, padding 0.5s, margin-right 0.5s;
  background-color: transparent;
  border-bottom: solid black 0.1rem;
`;

export const InnerItem = styled.i`
  ${Item.componentStyle.rules}
  padding: 0;
  text-overflow: ellipsis;
  overflow: hidden;
  position: relative;
  font-size: 1.4rem;
  font-style: normal;
  white-space: pre-wrap;
  line-height: 2rem;
  left: 0;
  opacity: 0;
  max-width: 0;
  max-height: 0;
  margin-right: 0;
  content: ${({ content }) => content};
  /* */
`;
