import styled from "styled-components";

export const Container = styled.div`
  padding: 1.2rem;
  border-radius: 0.8rem;
  border: 1px solid black;
  height: auto;
  min-width: 45rem;
  max-width: 45rem;
  max-height: 45rem;
  backdrop-filter: blur(6px) brightness(80%);
  display: block;
  @media(max-width:500px){
    min-width: 32rem;
    max-width: 32rem;
  }
`;

export const Image = styled.img`
  border-radius: 0.8rem;
  border: 0.4rem solid black;
  max-width: 100%;
  max-height: 80%;
  object-fit: cover;
  object-position: center center;
  cursor: ${({zoomed})=>zoomed?"zoom-out":"zoom-in"};
`;

export const Url = styled.a``;

export const Dashboard = styled.div`
  padding: 1.2rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
