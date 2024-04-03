import styled from "styled-components";

export const Content = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  width: available;
  max-width: 600px;
  padding: 2rem;
  /* margin: 2rem; */
  font-weight: bold;
  /* border: 1px solid black; */
  font-family: var(--main-font);
  h2 {
    font-size: 2rem;
    font-weight: 400;
    margin-bottom: 1rem;
    font-family: var(--title-font);
  }
  @media screen and (max-width: 800px) {
    padding: 0;
  }
`;

export const FormStyle = styled.form`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 2rem;
  justify-content: center;
`;

export const Button = styled.button`
  padding: 0.6rem 2.4rem;
  border-radius: 0.4rem;
  border: none;
  background-color: var(--main-color-500);
  align-self: center;
  width: fit-content;
  font-weight: bold;
  font-size: 1.4rem;
  color: black;
  font-family: var(--text-font);
  margin: 1.8rem 0;
  border: solid 2px transparent;
  transition: 0.4s;
  &:hover {
    border: solid 2px var(--main-color-400);
  }
`;

export const InputHelper = styled.span`
  --padding: -1rem;
  ${({ left = true }: any) =>
    left ? "left: var(--padding);" : "right: var(--padding);"}
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  font-size: 2rem;
  font-weight: 800;
  color: var(--secondary-color-900);
`;

export const Message = styled.span`
  font-size: 1.4rem;
  color: black;
  text-align: left;
  background-color: var(--main-color-400);
  padding: 0 2rem;
`;
