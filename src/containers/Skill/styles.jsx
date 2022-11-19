import styled from 'styled-components'

export const Content = styled.div`
  width: 70%;
`

export const Container = styled.div`
  display: flex;
  flex-direction: ${({ reverse }) => (reverse ? 'row-reverse' : 'row')};
  position: relative;
  min-height: 45rem;
  width: 100%;
`

export const Title = styled.h3`
  text-align: center;
  width: 100%;
  font-size: 3.8rem;
  background-color: #92ee599d;
`

export const InnerContainer = styled.div`
  min-height: 40rem;
  font-size: 2.8rem;
  padding: 1.8rem;
  background-color: #dc58589d;
  &.image {
    width: 35%;
    background-color: #5983ee9d;
    align-items: center;
  }
  &.description {
    width: 65%;
  }
`

export const Image = styled.img`
  width: 100%;
  border-radius: 0.4rem;
  height: fit-content;
  object-fit: cover;
  object-position: center center;
  @media (max-width: 1360px) {
    width: 47%;
  }
  @media (max-width: 600px) {
    width: 100%;
  }
`
