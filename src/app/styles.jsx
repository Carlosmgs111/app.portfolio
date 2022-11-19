import styled, { keyframes } from 'styled-components'

export const Header = styled.header`
  font-size: 1.8rem;
  width: 100%;
  height: fit-content;
  justify-items: center;
  z-index: 2;
  top: 0;
  padding: ${({ showFixed }) => (showFixed ? '.2rem 2rem' : '2rem')};
  position: sticky;
  backdrop-filter: brightness(40%) blur(0.6rem);
  transition: padding 0.4s;
`

export const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: top;
  justify-content: center;
  top: 10vh;
  width: 100%;
  min-height: 70vh;
  align-self: center;
  z-index: 1;
  @media (max-width: 1360px) {
    min-height: 80vh;
  }
`

export const Footer = styled.footer`
  backdrop-filter: brightness(40%) blur(0.6rem);
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 20vh;
`

export const Banner = styled.h1`
  color: hsl(67, 100%, 55%);
  font-weight: bold;
  font-size: 3.4rem;
  @media (max-width: 480px) {
    font-size: 2.6rem;
  }
`

export const Icon = styled.i`
  top: 0;
  font-size: 2.5rem;
  color: ${({ state }) =>
    !state ? 'hsl(349.9, 95.7%, 36.4%)' : 'hsl(140, 71%, 44%)'};
  -webkit-text-stroke: 1.5px black;
  border-radius: 25px;
  border: 3px solid black;
  padding: 3px;
  :hover {
    color: hsl(19, 97%, 51%);
  }
`
