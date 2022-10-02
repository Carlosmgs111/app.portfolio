import styled from "styled-components";

export const List = styled.ul`
  font-size:1.4rem;
  border: 1px solid black;
  min-width: 42rem;
  padding: 2rem 0 0 0;
  align-items:center;
  text-align:center;
  list-style: none;
  border-radius: .5rem;
  height: fit-content;
  padding-bottom: 2rem;
  /* background-color: rgba(225,225,225,.5); */
  backdrop-filter: blur(5px) invert(80%);
`;

export const FormStyle = styled.div`
  width: 100%;
  text-align: center;
  display: inline-flex;
`;

export const RightSide = styled.div`
  width: 65%;
  margin-bottom: .5rem;
  text-align: left;
  input {
    height:2rem;
    position:relative;
    left:-2rem;
    border-radius: 0.6rem;
    border: none;
    padding: 0 0.8rem;
    outline: none;
  }
`;

export const LeftSide = styled.div`
  padding-right: 2rem;
  width: 35%;
  text-align: right;
`;

export const DeleteButton = styled.button`
  margin: 0.4rem 0;
  padding: 0.2rem 1.2rem;
  border-radius: 0.4rem;
  border: none;
  background-color: rgb(240, 59, 38);
  width: fit-content;
  font-weight: bold;
`;

export const ExpandButton = styled.button`
  width: 100%;
  height: 4rem;
  background-color: transparent;
  border-radius: 2rem;
  border: none;
  :focus {
    outline: none;
  }
`;
