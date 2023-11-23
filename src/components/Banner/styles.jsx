import styled, { css } from "styled-components";

export const Body = styled.div`
  width: 100%;
  height: 20rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: sticky;
  top: -14rem;
  left: 0;
  z-index: 1;
  background: linear-gradient(to right, #f026df, #e4ff1a, #fb5609, #00ffc8);
  ${({ styles }) => styles}
  /* background:url("https://w.forfun.com/fetch/3b/3b1318af97da781e28a3fa9fee4c0857.jpeg") !important; */
  background-size: cover  !important;
  background-position: center !important;
  box-shadow: 10px 12px 15px black;
`;

export const Title = styled.h1`
  font-family: "Anton";
  text-align: center;
  font-size: 5.2rem;
  font-weight: 1000;
  color: transparent;
  border-radius: 2rem;
  -webkit-text-stroke: black 1px;

  background: /* url("https://w.forfun.com/fetch/3b/3b1318af97da781e28a3fa9fee4c0857.jpeg"), */
    #e2e2e25c;
  background-clip: text;
  -webkit-background-clip: text;
  background-blend-mode: screen;

  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;
