import styled, { css } from "styled-components";
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
  z-index: 1;
  &.navbar {
    display: flex;
    justify-content: space-between;
    align-content: center;
    padding: 0 2vw;
    width: inherit;
    height: inherit;
  }
  &.sidebar {
    width: fit-content;
  }
`;

export const ItemsList = styled.ul`
  border: 1px solid black;
  backdrop-filter: blur(0.6rem);
  border-radius: 12px;
  &.navbar {
    font-size: 1.8rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    align-content: center;
    padding: 0 8px;
  }
  &.sidebar {
    display: block;
    width: inherit;
    font-size: 1.8rem;
    position: relative;
  }
`;

export const Item = styled.li`
  z-index: 1;
  list-style: none;
  padding: 0;
  text-decoration: none;
  color: #16222a;
  font-size: 1.4rem;
  font-weight: bold;
  font-family: "Quicksand", sans-serif;
  display: block;
  text-align: center;
  background-color: inherit;
  color: black;
  font-style: none !important;
  &:hover {
    color: black;
    text-decoration: none;
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
`;

export const Link = styled(LinkRouter)`
  ${Item.componentStyle.rules}
`;
