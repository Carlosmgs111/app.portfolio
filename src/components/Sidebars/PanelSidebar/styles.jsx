import styled, { css } from 'styled-components'
import { setFrames } from '../../../utils'

export const SidebarBody = styled.div`
  border-radius: 0.6rem;
  display: flex;
  flex-direction: column;
  overflow: scroll;
  min-height: fit-content;
  direction: rtl;
  font-size: 1.6rem;
  max-height: ${({ active }) => (active ? '60vh' : '0')};
  max-width: ${({ active }) => (active ? '260px' : '0')};
  transition: max-height 0.4s, max-width 0.4s, padding-right 0.4s;
  box-shadow: inset 0px 0px 4px 2px rgba(0, 0, 0, 0.2);
  &::-webkit-scrollbar {
    width: 0.4rem;
    display: inside;
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: black;
  }
  &::-webkit-scrollbar:horizontal {
    display: none;
  }
`

export const Item = styled.a`
  cursor: default;
  text-decoration: none;
  position: relative;
  display: flex;
  flex-direction: row;
  padding: 0.8rem;
  left: 0;
  color: hsl(19, 97%, 51%);
  direction: ltr;
  -webkit-text-stroke: 0.6px black;
  height: fit-content;
  &:visited {
    color: unset;
  }
  &:hover {
    color: rgb(240, 38, 223) !important;
  }
  /* background-color: #cadf2b; */
  color: ${({ active }) =>
    active ? 'hsl(67, 100%, 55%)' : 'inherit'} !important;

  :hover {
    input {
      width: 18rem;
      opacity: 1;
      padding: 0 0.8rem;
      margin-right: 1rem;
    }
  }
`

export const Input = styled.input`
  -webkit-text-stroke: 0.1px black;
  font-weight: normal;
  border-radius: 0.4rem;
  height: 2.2rem;
  border: 0;
  outline: none;
  position: relative;
  left: 1rem;
  width: 0;
  opacity: 0;
  padding: 0;
  transition: width 0.5s, opacity 0.5s, padding 0.5s, margin-right 0.5s;
`
