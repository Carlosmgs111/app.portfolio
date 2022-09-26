import styled from "styled-components";

export const Header = styled.header`
  font-size: 1.8rem; 
  width: 100%;
  height: 10vh;
  justify-items: center;
  position: fixed;
  z-index: 1;
  top: 0;
`;

export const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  position: relative;
  justify-content: center;
  top: 10vh;
  max-width: 100vw;
  min-height: 90vh;
  align-self: center;
  padding: 0 8vw 18vh 8vw;
`;

export const Footer = styled.footer`
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 10vh;
  background-color: #f3197b;
`;