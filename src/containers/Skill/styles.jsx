import styled from "styled-components";

export const Content = styled.div`
  width: 45%;
  height: fit-content;
  background-image: ${({ reverse }) =>
    reverse
      ? "url('https://images.hdqwalls.com/wallpapers/stripes-geometric-figures-4k-fc.jpg')"
      : "url('https://images.hdqwalls.com/wallpapers/colorful-stripes-geometric-figures-4k-e9.jpg')"};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 0.8rem;
  padding: 2rem;
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
`;

export const InnerContainer = styled.div`
  min-height: 40rem;
  font-size: 2.8rem;
  padding: 1.8rem;
  text-align: ${({ reverse }) => (reverse ? "right" : "left")};
  height: fit-content;
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
