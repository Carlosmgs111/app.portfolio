import styled, { css } from 'styled-components'
import { setFrames } from '../../../utils'

export const SidebarBody = styled.div`
  border-radius: 0 0.6rem 0.6rem 0;
  display: flex;
  flex-direction: column;
  overflow: scroll;
  min-height: fit-content;
  direction: rtl;
  font-size: 2rem;
  max-height: ${({ active }) => (active ? '60vh' : '0')};
  max-width: ${({ active }) => (active ? '260px' : '0')};
  transition: max-height 0.4s, max-width 0.4s;
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
// ? animation initial state
const hidden = css`
  width: 0;
  opacity: 0;
  padding: 0;
`
// ? animation final state
const visible = css`
  opacity: 1;
  width: 18rem;
  padding: 0 0.8rem;
`

const interlude = css`
  opacity: 0.3;
  width: 50px;
  background-color: #94ef2d;
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
-webkit-text-stroke: 1.5px black;
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
input {
  ${hidden}
  animation: 1.5s ${setFrames([visible, hidden])} ease;
}
:hover {
  input {
    ${visible}
    animation: 1.5s ${setFrames([hidden, visible])} ease;
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
`
