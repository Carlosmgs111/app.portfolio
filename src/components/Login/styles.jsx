import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: fit-content;
  height: fit-content;
  font-size: 2rem;
  background-color: #232526ce;
  padding: 15px;
  border-radius: 15px;
  gap: 1.2rem;
  align-items: center;
  padding: 4rem;
  z-index: 1000;
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
  background-color: transparent;
  border: solid black 1px;
  border-radius: 4rem;
  padding: 0.8rem;
  &:disabled {
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
  transition: background-color 0.4s, color 0.4s;
`;

export const EmbedButton = styled.i`
  font-size: 2.8rem;
  color: #f026df;
  position: relative;
  left: 12rem;
`;
