import styled, { css, keyframes } from 'styled-components'
import { Link as LinkRouter } from 'react-router-dom'
import { setFrames } from '../../utils'

export const NavbarContainer = styled.div`
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  &.navbar {
    height: auto;
    display: inline;
  }
  &.sidebar {
    z-index: 2;
    height: 80vh;
    width: fit-content;
    position: fixed;
    top: 10vh;
    left: 2vw;
    box-sizing: border-box;
  }
`

export const NavbarHeader = styled.div`
  justify-content: space-between;
  display: flex;
  flex-direction: row;
  @media (max-width: 830px) {
    width: 100%;
  }
`

export const NavigateBar = styled.nav`
  z-index: 1;
  /* backdrop-filter: brightness(60%); */
  /* background-color: black; */
  &.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2vw;
    width: inherit;
    height: inherit;
    @media (max-width: 1360px) {
      flex-direction: column;
    }
  }
  &.sidebar {
    width: fit-content;
  }
`

const fadeinshow = keyframes`
  from{
    opacity:0;
  }
  to{
    opacity:1;
  }
`

export const ItemsList = styled.ul`
  color: transparent;
  font-size: 3rem;
  /* backdrop-filter: blur(10rem) brightness(0.4); */
  border-radius: 6px;
  max-height: ${({ showfixed }) => (showfixed ? '10rem' : '10rem')};
  transition: max-height 0.5s;
  &.navbar {
    font-size: 2.8rem;
    display: flex;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
    align-content: center;
    justify-content: left;
    align-items: center;
    transition: max-height 0.4s;
    @media (max-width: 830px) {
      animation: 0.8s ${fadeinshow} ease;
      max-height: ${({ show }) => (show ? '40rem' : '0')};
      flex-direction: column;
      align-items: center;
      position: relative;
      top: 0;
      width: 100%;
    }
    @media (max-width: 480px) {
      width: 100%;
    }
  }
  &.sidebar {
    display: block;
    width: inherit;
    font-size: 1.8rem;
    position: relative;
  }
`

export const from = ({ selected }) => css`
  color: ${selected ? 'rgb(228, 255, 26)' : 'rgba(228, 255, 26, .4)'};
`

export const to = css`
  color: rgb(228, 255, 26);
`

export const Item = styled.li`
  animation: 1.2s ${(props) => setFrames([to, from], props)} ease;
  z-index: 1;
  list-style: none;
  padding: 0;
  text-decoration: none;
  ${(props) => from(props)};
  font-size: 1.2rem;
  transition: font-size 0.4s;
  font-weight: 500;
  font-family: 'Quicksand', sans-serif;
  text-align: center;
  font-style: none !important;
  &:hover {
    ${to};
    text-decoration: none;
    animation: 1.2s ${(props) => setFrames([from, to], props)} ease;
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
      return props.position === 'first'
        ? css`
            border-radius: var(--border-radius) 0 0 var(--border-radius);
          `
        : props.position === 'last'
        ? css`
            border-radius: 0 var(--border-radius) var(--border-radius) 0;
          `
        : props.position === 'only'
        ? css`
            border-radius: var(--border-radius);
          `
        : null
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
        font-family: 'Quicksand', sans-serif;
      }

      ${(props) => {
        return props.position === 'first'
          ? css`
              border-radius: var(--border-radius) var(--border-radius)
                var(--border-radius) 0;
            `
          : props.position === 'last'
          ? css`
              border-radius: 0 var(--border-radius) var(--border-radius)
                var(--border-radius);
            `
          : props.position === 'only'
          ? css`
              border-radius: var(--border-radius);
            `
          : null
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
        font-family: 'Quicksand', sans-serif;
      }

      ${(props) => {
        return props.position === 'first'
          ? css`
              border-radius: var(--border-radius) var(--border-radius)
                var(--border-radius) 0;
            `
          : props.position === 'last'
          ? css`
              border-radius: 0 var(--border-radius) var(--border-radius)
                var(--border-radius);
            `
          : props.position === 'only'
          ? css`
              border-radius: var(--border-radius);
            `
          : null
      }}
    }

    ${(props) => {
      return props.position === 'first'
        ? css`
            border-radius: var(--border-radius) var(--border-radius) 0 0;
          `
        : props.position === 'last'
        ? css`
            border-radius: 0 0 var(--border-radius) var(--border-radius);
          `
        : props.position === 'only'
        ? css`
            border-radius: var(--border-radius);
          `
        : null
    }}
  }
  @media (max-width: 830px) {
    width: fit-content;
  }
  @media (max-width: 480px) {
    font-size: 1.8rem;
  }
`

export const Button = styled.i`
  display: none;
  color: white;
  @media (max-width: 830px) {
    display: block;
    right: 15px;
    top: 2rem;
    font-size: 4rem;
  }
  @media (max-width: 480px) {
    font-size: 3rem;
  }
`

export const Banner = styled(LinkRouter)`
  ${Item.componentStyle.rules}
  margin:0;
`

export const Link = styled(LinkRouter)`
  ${Item.componentStyle.rules}
`
