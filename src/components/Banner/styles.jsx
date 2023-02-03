import styled from "styled-components";

export const Body = styled.div`
  width: 100%;
  height: 30rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: sticky;
  top: -20rem;
  left: 0;
  z-index: 1;
  background: linear-gradient(to right, #f026df, #e4ff1a, #fb5609, #00ffc8);
  ${({ styles }) => styles}
  background-position: center;
  background-size: cover;
`;
export const Title = styled.h1`
  text-align: center;
  font-size: 8rem;
  font-weight: 1000;
  color: #111111;
  backdrop-filter: invert(100%) blur(1px);
  border-radius: 2rem;
`;
