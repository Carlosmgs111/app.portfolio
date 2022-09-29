import styled, { css, keyframes } from "styled-components";
import { Link as LinkRouter } from "react-router-dom";

export const NavbarContainer = styled.div`
  &.navbar {
    height: 10vh;
    display: inline;
    top: -20px;
  }
  &.sidebar {
    z-index: 2;
    height: 80vh;
    width: fit-content;
    position: fixed;
    top: 10vh;
    left: 2vw;
    overflow: scroll;
    box-sizing: border-box;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

export const NavigateBar = styled.nav`
  margin: 4rem 10rem 0 10rem;
  z-index: 1;
  &.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2vw;
    width: inherit;
    height: inherit;
    @media (max-width: 1360px) {
      display: block;
    }
    @media (max-width: 1035px) {
      margin: 4rem 8rem 0 8rem;
      display: block;
    }
    @media (max-width: 995px) {
      margin: 4rem 2rem 0 2rem;
      display: block;
    }
    @media (max-width: 895px) {
      margin: 4rem 0 0 0;
      display: block;
    }
  }
  &.sidebar {
    width: fit-content;
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
const fadeoutshow = keyframes`
from{
  opacity:1;
}
to{
  opacity:0;
}
`;

export const ItemsList = styled.ul`
  color: transparent;
  border: 1px solid hsl(67, 100%, 55%);
  font-size: 3rem;
  backdrop-filter: blur(10rem) brightness(0.4);
  border-radius: 6px;
  height: auto;
  &.navbar {
    font-size: 3.8rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    align-content: center;
    padding: 0 8px;
    @media (max-width: 1360px) {
    justify-content: center;
    align-items: center;
    }
    @media (max-width: 830px) {
      animation: 0.8s ${fadeinshow} ease;
      display: ${(props) => (props.show ? "block" : "none")};
    }
  }
  &.sidebar {
    display: block;
    width: inherit;
    font-size: 1.8rem;
    position: relative;
  }
`;

export const fadein = keyframes`
  from{
    color: ${({ active }) =>
      active ? "rgb(228, 255, 26)" : "rgba(228, 255, 26, .4)"};
  }
  to{
    color: rgb(228, 255, 26);
  }
`;
export const fadeout = keyframes`
  to{
    color: ${({ active }) =>
      active ? "rgb(228, 255, 26)" : "rgba(228, 255, 26, .4)"};
  }
  from{
    color: rgb(228, 255, 26);
  }
`;

export const Item = styled.li`
  &.active {
    color: rgb(228, 255, 26);
  }
  animation: 1.2s ${fadeout} ease;
  z-index: 1;
  list-style: none;
  padding: 0;
  text-decoration: none;
  color: ${({ active }) =>
    active ? "rgb(228, 255, 26)" : "rgba(228, 255, 26, .4)"};
  font-size: 2.8rem;
  font-weight: bold;
  font-family: "Quicksand", sans-serif;
  display: block;
  text-align: center;
  font-style: none !important;
  &:hover {
    color: rgb(228, 255, 26);
    text-decoration: none;
    animation: 1.2s ${fadein} ease;
  }
  &.navbar {
    padding: 1rem 0.8rem;
    .item {
      margin: 0;
      font-style: none !important;
    }
    &:hover {
      width: auto;
      /* box-shadow: inset -4px -8px 8px rgba(38, 45, 4, 0.6); */
    }
    ${(props) => {
      return props.position === "first"
        ? css`
            border-radius: var(--border-radius) 0 0 var(--border-radius);
          `
        : props.position === "last"
        ? css`
            border-radius: 0 var(--border-radius) var(--border-radius) 0;
          `
        : props.position === "only"
        ? css`
            border-radius: var(--border-radius);
          `
        : null;
    }}
  }
  &.sidebar {
    min-width: 6rem;
    border-radius: 0;
    background-color: #ef9305;
    width: fit-content;
    white-space: nowrap;
    color: #161a03;
    padding: 1.2rem;
    .item {
      font-size: inherit;
      display: inline-flex;
    }
    .inner {
      padding: 0;
      margin: 0;
      font-size: inherit;
      display: none;
    }
    &:hover {
      color: black;
      /* box-shadow: -4px -6px 8px rgba(38, 45, 4, 0.6);  */
      width: fit-content;
      border-radius: 0 var(--border-radius) var(--border-radius) 0;
      background-color: #ef9305;
      .inner {
        padding-left: 10px;
        display: inline;
        font-family: "Quicksand", sans-serif;
      }

      ${(props) => {
        return props.position === "first"
          ? css`
              border-radius: var(--border-radius) var(--border-radius)
                var(--border-radius) 0;
            `
          : props.position === "last"
          ? css`
              border-radius: 0 var(--border-radius) var(--border-radius)
                var(--border-radius);
            `
          : props.position === "only"
          ? css`
              border-radius: var(--border-radius);
            `
          : null;
      }}
    }

    &:focus {
      color: black;
      box-shadow: 0px 4px 8px rgba(38, 45, 4, 0.6);
      width: fit-content;
      border-radius: 0 var(--border-radius) var(--border-radius) 0;
      background-color: #ef9305;
      // background-color: rgba(240, 38, 223, 0.1);
      .inner {
        padding-left: 10px;
        display: inline;
        font-family: "Quicksand", sans-serif;
      }

      ${(props) => {
        return props.position === "first"
          ? css`
              border-radius: var(--border-radius) var(--border-radius)
                var(--border-radius) 0;
            `
          : props.position === "last"
          ? css`
              border-radius: 0 var(--border-radius) var(--border-radius)
                var(--border-radius);
            `
          : props.position === "only"
          ? css`
              border-radius: var(--border-radius);
            `
          : null;
      }}
    }

    ${(props) => {
      return props.position === "first"
        ? css`
            border-radius: var(--border-radius) var(--border-radius) 0 0;
          `
        : props.position === "last"
        ? css`
            border-radius: 0 0 var(--border-radius) var(--border-radius);
          `
        : props.position === "only"
        ? css`
            border-radius: var(--border-radius);
          `
        : null;
    }}
  }
  @media(max-width:480px){
    font-size: 1.8rem;
  }
`;

export const Button = styled.i`
  display: none;
  @media (max-width: 830px) {
    display: block;
    position: absolute;
    right: 15px;
    top: 2rem;
    font-size: 4rem;
  }
  @media (max-width: 830px) {
    top: 5.6rem;
  }
  @media (max-width: 480px) {
    top: 4.8rem;
    font-size: 3rem;
  }
`;

export const Link = styled(LinkRouter)`
  ${Item.componentStyle.rules}
`;
