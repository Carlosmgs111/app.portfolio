import styled from "styled-components";

export const Header = styled.header`
  font-size: 1.8rem;
  width: 100%;
  height: 10rem;
  z-index: 2;
  top: 0;
  position: sticky;
  backdrop-filter: brightness(40%) blur(0.6rem);
`;

export const Content = styled.div`
  justify-content: center;
  width: 100%;
  min-height: 75vh;
  z-index: 1;
  @media (max-width: 1360px) {
    min-height: 80vh;
  }
`;

export const Footer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 20vh;
  background-color: #0f2843;
  position: relative;
  margin-top: 20rem;
  bottom: 0;
`;

export const BannerStyle = styled.h1`
  color: #00deae;
  font-weight: bold;
  font-size: 3.4rem;
  @media (max-width: 480px) {
    font-size: 2.6rem;
  }
  :hover {
    color: #f026df;
  }
  transition: color 0.4s;
`;

export const ContentBanner = styled.div`
  width: 100%;
  height: 30rem;
  background-image: url("https://arc-anglerfish-arc2-prod-infobae.s3.amazonaws.com/public/Y2RBROL56RCODAPA3AF2MWUCRU.jpg");
  background-position: center;
  position: sticky;
  top: -25rem;
  z-index: 1;
`;

export const Icon = styled.i`
  top: 0;
  font-size: 2.5rem;
  color: ${({ state }) => (!state ? "#b30525" : "#21c056")};
  -webkit-text-stroke: 1.5px black;
  border-radius: 25px;
  border: 3px solid black;
  padding: 3px;
  :hover {
    color: #fb5609;
  }
`;
export const Avatar = styled.img`
  height: 3.4rem;
  width: 3.4rem;
  object-fit: cover;
  object-position: center center;
  border-radius: 4rem;
  border: 2px solid black;
  &:hover {
    border: 2px solid #e4ff1a;
  }
`;
