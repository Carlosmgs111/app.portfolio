import styled, { keyframes } from 'styled-components'

export const Header = styled.header`
  font-size: 1.8rem;
  width: 100%;
  min-height: 6rem;
  justify-items: center;
  z-index: 2;
  top: 0;
  position: sticky;
  backdrop-filter: brightness(40%) blur(0.6rem);
`

export const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: top;
  justify-content: center;
  top: 10vh;
  width: 100%;
  min-height: 75vh;
  align-self: center;
  z-index: 1;
  @media (max-width: 1360px) {
    min-height: 80vh;
  }
`

export const Footer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 20vh;
  background-color: #0f2843;
  position: relative;
  margin-top: 20rem;
  bottom: 0;
`

export const Banner = styled.h1`
  color: hsl(67, 100%, 55%);
  font-weight: bold;
  font-size: 3.4rem;
  @media (max-width: 480px) {
    font-size: 2.6rem;
  }
  :hover {
    color: rgb(240, 38, 223);
  }
  transition: color 0.4s;
`

export const ContentBanner = styled.div`
  width: 100%;
  height: 30rem;
  background-image: url('https://arc-anglerfish-arc2-prod-infobae.s3.amazonaws.com/public/Y2RBROL56RCODAPA3AF2MWUCRU.jpg');
  background-position: center;
  position: sticky;
  top: -25rem;
  z-index: 1;
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
