import styled from "styled-components";

export const FloatContainer = styled.div`
  position: sticky;
  top: 6rem;
  left: 0;
  height: 0;
  width: fit-content;
  z-index: 1;
`;

export const Main = styled.div`
  display: flex;
  left: 0;
`;

export const Wrapper = styled.div`
  display: flex;
  position: sticky;
`;

export const Sidebar = styled.div`
  border-radius: 0 0.6rem 0.6rem 0;
  backdrop-filter: blur(6px);
  border: solid transparent 1px;
  max-height: 70vh;
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
  ::before {
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
  width: max-content;
  transition: column-gap 0.4s;
`;
export const Header = styled.div`
  border-radius: 0.6rem;
  display: flex;
  /* flex-wrap: wrap; */
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
  :visited {
    color: unset;
  }
  :hover {
    color: #f026df !important;
  }
  &.rotable {
    :hover {
      font-size: 1.8rem;
    }
    ${({ active }) => active && "transform: rotate(90deg)"};
    ${({ active }) => active && "color: #f026df !important"};
  }
  /* background-color: orangered; */
  color: ${({ active }) => (active ? "#e4ff1a" : "inherit")} !important;
  transition: font-size 0.1s, transform 0.4s, max-width 0.6s, padding-right 0.4s,
    color 0.4s, left 0.6s, opacity 0.6s;
`;

export const SettingsContainer = styled.div`
  position: relative;
`;

export const SettingsDashboard = styled.div`
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
