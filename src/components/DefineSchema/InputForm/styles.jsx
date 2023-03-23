import styled from "styled-components";

export const List = styled.ul`
  font-size: 1.4rem;
  padding: 2rem;
  align-items: center;
  text-align: center;
  list-style: none;
  border-radius: 0.5rem;
  height: fit-content;
  padding-bottom: 2rem;
  position: sticky;
  width: 100%;
`;

export const FormStyle = styled.div`
  width: 100%;
  text-align: center;
  display: inline-flex;
  position: relative;
  margin: 0.6rem;
  input {
    height: 2.8rem;
    border-radius: 0.6rem;
    border: none;
    border-radius: 0.8rem;
    padding: 0 1.2rem;
    width: 100%;
    outline: none;
    border: 2px solid transparent;
    margin: 0 !important;
    transition: 0.4s;
    ::placeholder {
      transition: 0.4s;
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
    &:hover {
      border: 2px solid #01cda1;
      ::placeholder {
        color: transparent;
      }
    }
  }
  input[type="range"] {
    -webkit-appearance: none;
    width: 100%;
    height: 1rem;
    background: rgba(255, 255, 255, 0.6);
    border-radius: 5px;
    background-color: #ff4500;
    &:focus + .label,
    &:hover + .label {
      top: -1.6rem;
      left: 2rem;
      font-size: 14px;
      font-weight: 600;
      color: black;
      font-size: 1rem;
      opacity: 1;
    }
    ::-webkit-slider-thumb {
      -webkit-appearance: none;
      height: 2rem;
      width: 2rem;
      border-radius: 50%;
      background: #ff4500;
      cursor: ew-resize;
      box-shadow: 0 0 2px 0 #555;
      transition: background 0.3s ease-in-out;
    }
    ::-webkit-slider-runnable-track {
      -webkit-appearance: none;
      box-shadow: none;
      border: none;
      background: transparent;
    }
  }

  textarea {
    outline: none;
    padding: 0 1.2rem;
    overflow: auto;
    resize: vertical;
    transition: border 0.4s;
    border: 2px solid transparent;
    border-radius: 0.4rem;
    width: 100%;
    ::placeholder {
      transition: 0.4s;
    }
    &:focus + .label {
      top: -0.7rem;
      left: 2rem;
      font-size: 14px;
      font-weight: 600;
      color: black;
      font-size: 1rem;
      opacity: 1;
    }
    &:focus {
      border: 2px solid #01cda1;
      ::placeholder {
        color: transparent;
      }
    }
  }
  label {
    font-size: 0;
    width: fit-content;
    color: black;
    position: absolute;
    white-space: nowrap;
    background-color: #01cda1;
    border-radius: 0.5rem;
    left: 2.6rem;
    top: 0.6rem;
    padding: 0 4px;
    transition: 0.4s;
    opacity: 0;
    margin: 0;
    pointer-events: none;
  }
  select {
    height: 2.8rem;
    width: 100%;
    border-radius: 0.5rem;
    padding: 0 1.2rem;
    border: 2px solid transparent;
    transition: 0.4s;
    &:focus + .label,
    &:hover + .label {
      top: -0.7rem;
      left: 2rem;
      z-index: 10;
      font-size: 14px;
      font-weight: 600;
      color: black;
      font-size: 1rem;
      opacity: 1;
    }
    &:focus,
    &:hover {
      border: 2px solid #01cda1;
    }
  }
`;

export const ButtonsSection = styled.div`
  padding: 0.4rem;
  display: flex;
  flex-direction: row;
  position: absolute;
  opacity: 0;
  right: 0.2rem;
  gap: 0.6rem;
  transition: 0.4s;
  font-size: 1.4rem;
`;

export const DeleteButton = styled.button`
  margin: 0;
  height: fit-content;
  border-radius: 0.4rem;
  border: none;
  width: fit-content;
  font-weight: bold;
  transition: 0.2s;
  background-color: transparent;
  -webkit-text-stroke: 1px black;
  color: #f03b26;
  :hover {
    font-size: 1.8rem;
  }
  :focus {
    outline: none;
  }
  &.main {
    position: absolute;
    top: 0;
    right: 0;
    padding-right: 2rem;
  }
`;

export const AddButton = styled.button`
  margin: 0;
  height: fit-content;
  border-radius: 0.4rem;
  border: none;
  background-color: #21da09;
  width: fit-content;
  font-weight: bold;
  transition: 0.2s;
  :focus {
    outline: none;
  }
  &.mini {
    -webkit-text-stroke: 1px black;
    color: #21da09;
    background-color: transparent;
    :hover {
      font-size: 1.8rem;
    }
  }
`;

export const ExpandButton = styled.button`
  width: 100%;
  height: 4rem;
  background-color: transparent;
  border-radius: 2rem;
  border: none;
  :focus {
    outline: none;
  }
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.4rem;
  overflow: hidden;
  &:hover {
    div {
      opacity: 1;
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
