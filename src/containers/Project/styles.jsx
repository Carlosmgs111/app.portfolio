import styled from "styled-components";

export const ProjectContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: ${({ even }) => (even ? "row" : "row-reverse")};
  justify-content: space-around;
  gap: 3rem;
  padding: 1rem;
  min-height: 40rem;
  width: 100%;
  position:sticky;
  @media (max-width: 1360px) {
    flex-direction: column;
    align-items: center;
  }
  &:hover {
    #project-dashboard {
      opacity: 1;
    }
    a,
    i {
      opacity: 1;
    }
  }
`;

export const Title = styled.h1`
  padding: 4rem;
  text-align: center;
  width: 100%;
  font-size: 6rem;
`;

export const ImagesContainer = styled.div`
  display: flex;
  flex-direction: column wrap;
  flex-wrap: wrap;
  min-height: 30rem;
  max-width: 40%;
  justify-content: left;
  gap: 1.2rem;
  border-radius: 1rem;
  @media (max-width: 1360px) {
    max-width: 100%;
    justify-content: space-around;
  }
`;

export const Image = styled.img`
  position: absolute;
  position: sticky;
  max-width: 100%;
  max-height: 80%;
  object-fit: cover;
  object-position: center center;
  cursor: ${({ zoomed }) => (zoomed ? "zoom-out" : "zoom-in")};
  opacity: ${({ details }) => (!details ? "1" : "0")};
  transition: opacity 0.4s;
`;

export const DescriptionsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  height: fit-content;
  gap: 3rem;
  width: 55%;
  padding: 5rem;
  background-color: ${({ even }) => (even ? "#e4ff1a99" : "#ff811a99")};
  border-radius: 1rem;
  @media (max-width: 1360px) {
    width: 100%;
  }
`;

export const Description = styled.article`
  width: 100%;
  font-size: 2rem;
  text-align: left;
  @media (max-width: 830px) {
    width: 100%;
    font-size: 1.8rem;
  }
  @media (max-width: 480px) {
    width: 100%;
    font-size: 1.4rem;
  }
`;

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
`;

export const Button = styled.button`
  margin: 4px 12px 4px 12px;
  padding: 0 12px 0 12px;
  border: none;
  border-radius: 4px;
  padding: 0.6rem 1.2rem;
  color: #fffbff;
  background-color: #121f25;
  border: solid black 0.1rem;
  &:hover {
    color: #121f25;
    &.secondary {
      background-color: #f026df;
    }
    &.success {
      background-color: #21da09;
    }
    &.danger {
      background-color: #f03b26;
    }
  }
  transition: background-color 0.2s, color 0.2s;
`;
