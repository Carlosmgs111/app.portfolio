import styled from 'styled-components'

export const Container = styled.div`
  padding: 1.2rem;
  border-radius: 0.8rem;
  border: 0.4rem solid black;
  height: auto;
  min-width: 45rem;
  max-width: 45rem;
  min-height: 35rem;
  max-height: 405rem;
  text-align: center;
  position: sticky;
  background: linear-gradient(to right, #333399, #ff00cc);
  display: block;
  @media (max-width: 500px) {
    min-width: 32rem;
    max-width: 32rem;
  }
  &:hover {
    #certification-dashboard {
      opacity: 1;
    }
  }
`

export const Content = styled.div``

export const Image = styled.img`
  border-radius: 0.8rem;
  border: 0.1rem solid black;
  max-width: 100%;
  max-height: 80%;
  object-fit: cover;
  object-position: center center;
  cursor: ${({ zoomed }) => (zoomed ? 'zoom-out' : 'zoom-in')};
`

export const Url = styled.a`
  cursor: hand;
  text-decoration: none;
  padding: 0.8rem;
  font-size: 1.8rem;
  position: sticky;
  right: 0;
  color: black;
  &:visited {
    color: unset;
  }
  &:hover {
    color: rgb(240, 38, 223) !important;
  }
`

export const Dashboard = styled.div`
  border-radius: 0 0 0.8rem 0.8rem;
  display: flex;
  justify-content: space-around;
  background-color: #2c2b2b56;
  position: absolute;
  left: 0;
  bottom: 0;
  align-items: center;
  width: 100%;
  padding: 1.2rem 0;
  opacity: 0;
  transition: opacity 0.4s;
`
export const Button = styled.button`
  margin: 4px 12px 4px 12px;
  padding: 0 12px 0 12px;
  border: none;
  border-radius: 4px;
  &.secondary {
    background-color: rgb(240, 38, 223);
  }
  &.success {
    background-color: rgb(33, 218, 9);
  }
  &.danger {
    background-color: rgb(240, 59, 38);
  }
`
