import styled from "styled-components";

export const Content = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  width: available;
  padding: 2rem;
  margin: 2rem;
  /* border-radius: 1rem; */
  font-weight: bold;
  /* border: 1px solid black; */
  h2 {
    font-size: 2.4rem;
    font-weight: bold;
    margin-bottom: 4rem;
  }
`;

export const FormStyle = styled.form`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
  input {
    margin-left: 2rem;
    border-radius: 0.6rem;
  }
`;

export const Button = styled.button`
  padding: 0.2rem 1.2rem;
  border-radius: 0.4rem;
  border: none;
  background-color: #21da09;
  align-self: center;
  width: fit-content;
  font-weight: bold;
  font-size: 1.6rem;
  margin: 1rem 0;
`;
