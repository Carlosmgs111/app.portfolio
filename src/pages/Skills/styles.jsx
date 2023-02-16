import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  margin: 0;
  width: 100%;
  position: sticky;
`;

export const MainContainer = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  padding-top: 10rem;
  @media (max-width: 480px) {
    padding: 0.1rem;
  }
`;

export const Dashboard = styled.div`
  color: white;
  width: 100%;
  display: flex;
  height: fit-content;
  align-items: center;
  justify-content: space-around;
  background-color: #2b3f79;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;
