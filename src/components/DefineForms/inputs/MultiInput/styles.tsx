import styled from "styled-components";

export const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.4rem;
  overflow: hidden;
  &:hover,
  &:focus,
  &:active {
    div {
      opacity: 1;
      transform: scale(100%); // ? ⬅️ This refer to ButtonsContainer component
    }
  }
`;

export const MultiInputContainer = styled.div`
  display: flex;
  padding: 1rem 0;
  flex-direction: column;
  border-top: 1px black solid;
  gap: 1rem;
  width: 100%;
  &:hover {
    .label {
      top: -0.7rem;
      left: 2rem;
      font-size: 14px;
      font-weight: 600;
      color: black;
      font-size: 1rem;
      opacity: 1;
    }
  }
`;
