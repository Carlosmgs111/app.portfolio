import styled from "styled-components";

export const ProjectContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: ${({ even }) => (even ? "row" : "row-reverse")};
  justify-content: space-around;
  align-items: center;
  gap: 3rem;
  padding: 1rem;
  min-height: 70vh;
  width: 100%;
  position: sticky;
  /* background-color: ${({ even }) => (even ? "#e4ff1a3b" : "#ff811a99")}; */
  background-image: ${({ even }) =>
    even
      ? "url('https://images.hdqwalls.com/wallpapers/stripes-geometric-figures-4k-fc.jpg')"
      : "url('https://images.hdqwalls.com/wallpapers/colorful-stripes-geometric-figures-4k-e9.jpg')"};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  box-shadow: 10px 8px 15px black;
  @media (max-width: 1360px) {
    flex-direction: column;
    align-items: center;
  }
  &:hover {
    #project-dashboard {
      opacity: 1;
      bottom: 0;
    }
  }
`;

export const Title = styled.h1`
  margin: 4rem;
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
  height: fit-content;
  justify-content: ${({ even }) => (even ? "right" : "left")};
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
  max-width: ${({ big }) => (big ? "100%" : "48%")};
  max-height: 80%;
  object-fit: cover;
  border-radius: 0.8rem;
  object-position: center center;
  cursor: ${({ zoomed }) => (zoomed ? "zoom-out" : "zoom-in")};
  opacity: ${({ details }) => (!details ? "1" : "0")};
  transition: opacity 0.4s;
  border: solid 1px transparent;
  &:hover {
    border: solid 1px #f026df;
  }
  transition: border 0.6s;
`;

export const DescriptionsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  align-items: space-between;
  height: available;
  gap: 3rem;
  width: 55%;
  padding: 5rem;
  border-radius: 1rem;
  @media (max-width: 1360px) {
    width: 100%;
  }
`;

export const Description = styled.article`
  width: 100%;
  font-size: 2rem;
  text-align: ${({ even }) => (even ? "left" : "right")};
  height: fit-content;
  padding: 2rem;
  border-radius: 1.8rem;
  backdrop-filter: blur(5px) brightness(80%);
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
  backdrop-filter: brightness(40%) blur(4px);
  position: fixed;
  left: 0;
  bottom: 0;
  align-items: center;
  width: 100%;
  padding: 1.2rem 0;
  opacity: 0;
  transition: 0.4s;
  bottom: -100px;
  /* transition: background-color 0.4s, bottom 0.4s; */
  &:hover {
    background-color: #00deae51;
  }
`;

export const DashboardTitle = styled.h2`
  text-align: center;
`;

export const ButtonsSection = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

export const Button = styled.button`
  margin: 4px 12px 4px 12px;
  padding: 0 12px 0 12px;
  border: none;
  border-radius: 4px;
  padding: 0.6rem 1.2rem;
  font-weight: 800;
  /* color: #fffbff; */
  background-color: #121f25;
  &.secondary {
    border: solid #f026df 0.1rem;
    color: #f026df;
  }
  &.success {
    border: solid #21da09 0.1rem;
    color: #21da09;
  }
  &.danger {
    border: solid #f03b26 0.1rem;
    color: #f03b26;
  }
  &:hover {
    color: #121f25;
    border: solid black 0.1rem;
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
  :focus {
    outline: none;
  }
  transition: background-color 0.2s, color 0.2s, border 0.2s;
`;
