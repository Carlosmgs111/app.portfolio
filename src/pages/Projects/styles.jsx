import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  position: sticky;
  width: 100%;
`;

export const MainContainer = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  /* gap: 10px; */
  flex-wrap: wrap;
  width: 100%;
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
  /* background-color: #2b3f79; */
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`