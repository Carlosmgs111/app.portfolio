import styled from "styled-components";

export const Form = styled.form`
  width: fit-content;
  height: fit-content;
  font-size: 2rem;
  background-color: #232526;
  padding: 15px;
  border-radius: 15px;
`;

export const Title = styled.a`
  display: block;
  color: white;
  font-weight: bold;
  font-style: none;
  color: white;
  text-align: center;
  &:hover {
    text-decoration: none;
    color: white;
  }
`;

export const Input = styled.input`
  margin: 8px 0;
  padding: 0 8px;
  border: none;
  outline: none;
  text-align: center;
  width: 320px;
  background-color: inherit;
  color: black;
  display: block;
  background-color: #929292;
  border-radius: 4px;
  &[disabled] {
    opacity: 0.3;
  }
`;

export const Button = styled.button`
  display: block;
  width: 100%;
  border-radius: 4px;
  &:hover {
    background-color: black;
    color: white;
  }
  border-style: none;
  &[disabled] {
    opacity: 0.3;
  }
`;

export const EmbedButton = styled.i`
  font-size: 1.8rem;
  color: rgb(240, 38, 223);
  position: relative;
  left: 120px;
`;
