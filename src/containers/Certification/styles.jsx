import styled from "styled-components";

export const Container = styled.div`
  border-radius: 0.8rem;
  height: auto;
  min-width: 40rem;
  max-width: 45rem;
  min-height: 5rem;
  max-height: 405rem;
  text-align: center;
  position: sticky;
  background: linear-gradient(to right, #333399, #ff00cc);
  /* background: url("https://content.wepik.com/statics/4633832/preview-page0.jpg"); */
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  display: block;
  overflow: hidden;
  @media (max-width: 500px) {
    min-width: 32rem;
    max-width: 32rem;
  }
  &:hover {
    #certification-dashboard {
      opacity: 1;
    }
    a,
    i {
      opacity: 1;
    }
  }
  transition: max-width 0.4s;
`;

export const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
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

export const Details = styled.div`
  opacity: ${({ details }) => (details ? "1" : "0")};
  z-index: ${({ details }) => (details ? "0" : "-1")};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  position: absolute;
  transition: opacity 0.4s;
`;

export const Url = styled.a`
  cursor: hand;
  text-decoration: none !important;
  padding: 0.8rem;
  font-size: 1.8rem;
  position: absolute;
  bottom: 1.2rem;
  right: 1.2rem;
  color: #00ffc8 !important;
  -webkit-text-stroke: black 0.1rem;
  &:visited {
    color: unset;
  }
  &:hover {
    color: #f026df !important;
  }
  opacity: 0;
  transition: color 0.4s, opacity 0.4s;
`;

export const Displacement = styled.i`
  ${Url.componentStyle.rules}
  width:fit-content;
  left: 1.2rem;
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
  :focus {
    outline: none;
  }
  transition: background-color 0.2s, color 0.2s;
`;
