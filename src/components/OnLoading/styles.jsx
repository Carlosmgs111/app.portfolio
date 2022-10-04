import styled from "styled-components";

export const Container = styled.div`
  ${({component})=>component.componentStyle.rules}
  color: Green;
  font-size: 2rem;
  padding: 0 10rem;
`;
