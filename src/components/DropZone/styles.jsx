import styled from "styled-components";

export const DropzoneContainer = styled.div`
  position: relative;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const DropzoneBody = styled.div`
  width: 46rem;
  height: 36rem;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1rem;
  text-align: center;
  border-radius: 2rem;
  /* background-color: #c7c7c7; */
  backdrop-filter: brightness(100%);
  padding: 2rem;
  position: relative;
  border: black 0.2rem solid;
  transition: 0.4s;
  overflow: hidden;
  &:hover {
    border: #00ffc8 0.2rem solid;
    + label {
      top: 0;
      font-size: 1.2rem;
      background-color: #00ffc8;
      color: black;
    }
  }
`;

export const DropzoneLabel = styled.label`
  background-color: transparent;
  color: ${({ fileIn }) => (fileIn ? "transparent" : "#00ffc8")};
  font-size: 1.6rem;
  border-radius: 1rem;
  padding: 0.6rem;
  font-weight: 1000;
  border: none;
  position: absolute;
  top: 50%;
  transition: 0.4s;
  transform: translate(0, -50%);
  pointer-events: none;
`;

export const FilePreview = styled.embed`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  border-radius: 0.8rem;
  object-fit: cover;
  pointer-events: none;
  z-index: -1;
  transition: 0.6s;
`;
