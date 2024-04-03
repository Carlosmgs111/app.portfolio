import styled from "styled-components";

export const InputTextStyle = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.4rem;
  width: 100%;
  height: auto;

  &:hover {
    div {
      opacity: 1;
      transform: scale(100%); // ? ⬅️ This refer to ButtonsContainer component
    }
  }
  .label {
    z-index: 100;
  }
`;

export const TextArea = styled.textarea`
  outline: none;
  padding: 0.8rem 0.8rem 0 0.8rem;
  resize: vertical;
  transition: border 0.4s;
  border: 2px solid transparent;
  font-weight: 500;
  border-radius: 0.4rem;
  width: 100%;
  height: auto;
  min-height: var(--text-font-size);
  resize: none;
  overflow: hidden;
  font-family: var(--main-font);
  color: black;
  background-color: var(--main-color-500b);
  text-align: justify;
  ::placeholder {
    transition: 0.4s;
    color: black;
  }
  &:focus + .label,
  &:hover + .label,
  &:active + .label {
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
  &:active {
    border: 2px solid var(--main-color-400);
    ::placeholder {
      color: transparent;
    }
  }
`;
