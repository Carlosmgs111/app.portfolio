import styled from "styled-components";

export const List = styled.ul`
  font-size: 1.4rem;
  padding: 0;
  align-items: center;
  text-align: center;
  list-style: none;
  border-radius: 0.5rem;
  height: fit-content;
  padding-bottom: 2rem;
  position: sticky;
  width: 100%;
`;

export const FormStyle = styled.div`
  width: 100%;
  text-align: center;
  display: inline-flex;
  position: relative;
  margin: 0.6rem 0;

  label {
    font-size: 0;
    width: fit-content;
    color: black;
    position: absolute;
    white-space: nowrap;
    background-color: var(--main-color-400);
    border-radius: 0.5rem;
    left: 2.6rem;
    top: 0.6rem;
    padding: 0 4px;
    transition: 0.4s;
    opacity: 0;
    margin: 0;
    pointer-events: none;
  }
`;

export const ButtonsSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  opacity: 0;
  transform: scale(0);
  right: -3.4rem;
  gap: 0.2rem;
  transition: 0.4s;
  font-size: 1.6rem;
  font-family: var(--text-font);
  padding: 0 0.8rem;
`;

export const DeleteButton: any = styled.button`
  margin: 0;
  height: fit-content;
  border-radius: 0.4rem;
  border: none;
  width: fit-content;
  font-weight: bold;
  transition: 0.2s;
  background-color: transparent;
  -webkit-text-stroke: 1px black;
  color: var(--main-color-500b);
  &:hover {
    color: #f03b26;
  }
  &:focus {
    outline: none;
  }
  &.main {
    position: absolute;
    bottom: 0.4rem;
    right: 0;
    padding-right: 2rem;
    font-size: 1.6rem;
  }
`;

export const AddButton: any = styled.button`
  margin: 0;
  height: fit-content;
  border-radius: 0.4rem;
  border: none;
  color: var(--main-color-500b);
  width: fit-content;
  font-weight: light;
  transition: 0.2s;
  font-size: 2rem;
  padding: 0;
  background-color: transparent;
  -webkit-text-stroke: 1px black;
  &:focus {
    outline: none;
  }
  &:hover {
    color: #21da09;
  }
  &.main {
    position: absolute;
    bottom: 0.2rem;
    left: 0;
    padding-left: 2rem;
  }
`;

export const ExpandButton = styled.button`
  width: 100%;
  height: 4rem;
  background-color: transparent;
  border-radius: 2rem;
  border: none;
  &:focus {
    outline: none;
  }
`;
