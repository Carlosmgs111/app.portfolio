import styled from "styled-components";

export const ModalStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  backdrop-filter: brightness(30%);
  color: white;
  width: 100%;
  height: 100%;
  top: 0;
  z-index: ${({ isActive, over }) => {
    if (isActive && over) return 1000;
    if (isActive && !over) return 0;
    return -1;
  }};
  opacity: ${({ isActive }) => (isActive ? 1 : 0)};
  left: 0;
  padding: 0;
  margin: 0;
  transition: 0.4s;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  /*  @media (max-width: 1600px) {
    display: block;
  } */
`;

export const MainContainer = styled.div`
  position: relative; // Solo funciona si el contendor posee una posicion relativa
  min-height: 0;
  min-width: 0;
  max-width: 90%;
  max-height: 90%;
`;

export const ButtonContainer = styled.div`
  position: absolute; // Posicion absoluta con respecto a su contenedor
  top: 1rem;
  right: 1rem;
  align-items: center;
  justify-content: center;
  display: flex;
  width: 2rem;
  height: 2rem;
`;

export const CloseButton = styled.i`
  font-size: 2.4rem;
  color: #69686875;
  -webkit-text-stroke: 1.2px black;
  right: 2%;
  top: 2%;
  transition: 0.2s;
  font-weight: 1000;
  :hover {
    font-size: 2.8rem;
    color: #950202;
  }
`;
