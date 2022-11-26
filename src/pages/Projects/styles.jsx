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
