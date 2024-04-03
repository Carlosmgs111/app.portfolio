import styled from "styled-components";

export const CommonInputStyle = styled.input`
  height: 2.8rem;
  border-radius: 0.6rem;
  border: none;
  border-radius: 0.8rem;
  padding: 0 1.2rem;
  max-width: 30rem;
  width: 100%;
  outline: none;
  border: 2px solid transparent;
  margin: 0 !important;
  font-family: var(--main-font);
  transition: 0.4s;
  background-color: var(--main-color-500b);
  color: black;
  font-weight: 500;
  ::placeholder {
    transition: 0.4s;
    color: black;
  }
  &:focus + .label,
  &:hover + .label {
    top: -0.7rem;
    left: 2rem;
    font-size: 14px;
    font-weight: 600;
    color: black;
    font-size: 1rem;
    opacity: 1;
  }
  &:focus,
  &:hover,
  &active {
    border: 2px solid var(--main-color-400);
    ::placeholder {
      color: transparent;
    }
  }
`;
