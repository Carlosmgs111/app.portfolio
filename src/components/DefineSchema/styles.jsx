import { beutifyLabel } from "../../utils";
import styled from "styled-components";

export const Content = styled.div`
text-align: center;
  color:black;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 2rem;
  margin: 2rem;
  border-radius: 4rem;
  font-weight: bold;
  h2 {
    font-size: 2.4rem;
    font-weight: bold;
    margin-bottom: 4rem;
  }
`;
export const FormStyle = styled.form`
  display:flex;
  flex-wrap:wrap;
  gap:2rem;
  justify-content:center; 
  input{
    margin-left: 2rem;
    border-radius: 0.6rem;
  }
`;

export const Button = styled.button`
  padding: 0.2rem 1.2rem;
  border-radius: 0.4rem;
  border: none;
  background-color: rgb(33, 218, 9);
  align-self: center;
  width: fit-content;
  font-weight: bold;
  font-size: 1.6rem;
  margin: 1rem 0;
`;

