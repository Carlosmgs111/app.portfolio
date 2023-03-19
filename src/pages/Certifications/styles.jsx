import styled from "styled-components";

export const Container = styled.div`
  /* top: 20vh; */
  display: flex;
  position: sticky;
  width: 100%;
`;

export const MainContainer = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  gap: 6rem;
  flex-wrap: wrap;
  padding-top: 10rem;
  width: 100%;
  @media (max-width: 700px) {
    padding: 0;
  }
`;

export const Button = styled.button`
  margin: auto;
`;

export const Dashboard = styled.div`
  color: white;
  width: 100%;
  display: flex;
  height: fit-content;
  align-items: center;
  justify-content: space-around;
  background-color: #2b4e79;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;
