import styled from 'styled-components'

export const ModalStyle = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
  justify-items: center;
  position: fixed;
  /* background: rgba(240, 38, 223, 0.1); */
  backdrop-filter: blur(5px);
  color: white;
  z-index: ${({ over }) => (over ? 1000 : 0)};
  opacity: 1;
  animation: modal 500ms ease-out forwards;
  transition: transform 1s linear;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  padding: 0;
  margin: 0;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  /*  @media (max-width: 1600px) {
    display: block;
  } */
`

export const EmbedButton = styled.i`
  font-size: 4rem;
  color: rgb(240, 38, 223);
  position: relative;
  right: -6%;
`

export const NativeEmbedButton = styled.i`
  font-size: 2rem;
  color: rgb(240, 38, 223);
  position: fixed;
  right: 2%;
  top: 2%;
`

export const ModalContainer = styled.div`
  z-index: 1;
  display: inline-flex;
  justify-content: space-around;
  width: fit-content;
  min-height: 50vh;
  min-width: 40vw;
  max-height: 60vh;
  max-width: 40vw;
  padding: 2rem;
  margin: 2rem;
  background-color: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(0.6rem);
  font-size: 1.4rem;
  border-radius: 2rem;
  color: #100f0f;
  @media (max-width: 760px) {
    display: inline-block;
  }
  overflow: scroll;
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    display: none;
  }
  box-shadow: inset 0px 0px 10px 20px rgba(48, 48, 48, 0.687);
`
