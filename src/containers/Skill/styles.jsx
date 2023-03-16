import styled from "styled-components";

export const Content = styled.div`
  width: 30%;
  height: 36rem;
  background-image: ${({ reverse }) =>
    reverse
      ? "url('https://images.hdqwalls.com/wallpapers/stripes-geometric-figures-4k-fc.jpg')"
      : "url('https://images.hdqwalls.com/wallpapers/colorful-stripes-geometric-figures-4k-e9.jpg')"};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 0.8rem;
  position: sticky;
  box-shadow: 10px 8px 15px black;
  overflow: hidden;
  &:hover {
    #skill-dashboard {
      opacity: 1;
      bottom: 0;
    }
  }
`;

export const Main = styled.div`
  backdrop-filter: blur(2px);
  padding: 2rem;
  border-radius: 0.8rem;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: ${({ reverse }) => (reverse ? "row-reverse" : "row")};
  position: relative;
  width: 100%;
`;

export const Title = styled.h3`
  text-align: center;
  width: 100%;
  font-size: 3.8rem;
  margin: 2rem;
  backdrop-filter: brightness(100%);
`;

export const InnerContainer = styled.div`
  font-size: 1.8rem;
  padding: 1.8rem;
  max-height: 20rem;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  text-align: ${({ reverse }) => (reverse ? "right" : "left")};
  &.image {
    width: 35%;
    align-items: center;
  }
  &.description {
    width: 65%;
  }
`;

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
`;

export const Dashboard = styled.div`
  border-radius: 0 0 0.8rem 0.8rem;
  backdrop-filter: brightness(70%);
  position: absolute;
  left: 0;
  bottom: -10rem;
  align-items: center;
  text-align: center;
  width: 100%;
  padding: 0 0 1.2rem 0;
  opacity: 0;
  transition: background-color 0.4s, opacity 0.4s, bottom 0.4s;
  &:hover {
    background-color: #00deae51;
  }
`;

export const HideButton = styled.i`
  width: 2rem;
  height: 2rem;
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
