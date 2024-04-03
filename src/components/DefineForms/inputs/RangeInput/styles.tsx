import styled from "styled-components";

export const Range = styled.input`
  appearance: none;
  width: 100%;
  height: 1rem;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 5px;
  background-color: #ff4500;
  margin: 0.4rem 0;
  cursor: ew-resize;
  &:focus + .label,
  &:hover + .label,
  &:active + .label,
  &.active + .label {
    top: -1.6rem;
    left: 2rem;
    font-size: 14px;
    font-weight: 600;
    color: black;
    font-size: 1rem;
    opacity: 1;
  }
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 2rem;
    width: 2rem;
    border-radius: 50%;
    background: #ff4500;
    box-shadow: 0 0 6px 0 #555;
    transition: background 0.3s ease-in-out;
  }
  &::-webkit-slider-runnable-track {
    -webkit-appearance: none;
    box-shadow: none;
    border: none;
    background: transparent;
  }
`;
