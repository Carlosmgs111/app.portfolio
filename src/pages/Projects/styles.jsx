import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  position: sticky;
`

export const Banner = styled.div`
  width: 100%;
  height: 30rem;
  background-image: url('https://arc-anglerfish-arc2-prod-infobae.s3.amazonaws.com/public/Y2RBROL56RCODAPA3AF2MWUCRU.jpg');
  background-position: center;
`

export const MainContainer = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  width: calc(100% + 4vw);
  @media (max-width: 480px) {
    padding: 0.1rem;
  }
`
