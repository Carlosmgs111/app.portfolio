import styled from "styled-components";

export const Container = styled.div`
  position: relative;
`;

export const Dashboard = styled.div`
  border-radius: 0.6rem;
  border: solid transparent 1px;
  position: absolute;
  padding: 0.8rem;
  backdrop-filter: blur(6px);
  left: ${({ show }) => (show ? "0" : `-30px`)};
  opacity: ${({ show }) => (show ? "1" : "0")};
  z-index: ${({ show }) => (show ? "1" : "-1")};
  bottom: 0;
  transition: 0.4s;
  background-color: #2b4e7933;
  :hover {
    border: solid #00ffc8 1px;
  }
`;

export const Hide = styled.i`
  font-size: 2rem;
  color: #f03b26;
  -webkit-text-stroke: 0.8px black;
  transition: 0.2s;
  font-weight: 1000;
  :hover {
    translate: -0.4rem;
  }
`;

export const Switch = styled.label`
  position: relative;
  display: inline-block;
  width: 28px;
  height: 14px;
  align-self: center;
  input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  input:checked + .slider {
    background-color: #00ffc8;
    &.direction {
      background-color: #f28c0f;
    }
  }

  input:focus + .slider {
    box-shadow: #00ffc8;
    &.direction {
      box-shadow: 0 0 1px #f28c0f;
    }
  }

  input:checked + .slider:before {
    transform: translateX(13px);
  }
`;

export const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #cccccc;
  transition: 0.4s;
  font-size: 1rem;
  color: black;
  &:before {
    position: absolute;
    height: 10px;
    width: 6px;
    left: 2px;
    top: 2px;
    transition: 0.4s;
    background-color: transparent;
  }
  &.direction {
    background-color: #89f10a;
  }
  &.round {
    border-radius: 34px;
    &:before {
      border-radius: 50%;
    }
  }
`;
