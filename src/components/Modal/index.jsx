import { Children, cloneElement } from "react";
import {
  ModalStyle,
  CloseButton,
  ButtonContainer,
  MainContainer,
} from "./styles";

export const Modal = ({
  children,
  injected,
  setInjected = () => {},
  active = false,
  onClick = null,
  over = true,
  showCloseButton = true,
}) => {
  const isActive = active || Boolean(children) || Boolean(injected);
  return (
    <ModalStyle
      {...{
        onClick: (e) => {
          if (e.target.id === "modal_body") setInjected(null);
        },
        over,
        isActive,
        id: "modal_body",
      }}
    >
      <MainContainer>
        {Children.toArray(children || injected).map((child) =>
          cloneElement(child, {
            ...child.props,
            disabled: true,
            style: { maxHeight: "90vh" },
          })
        )}
        {showCloseButton && (
          <ButtonContainer>
            <CloseButton
              className="fa-solid fa-xmark"
              onClick={() => setInjected(null)}
            />
          </ButtonContainer>
        )}
      </MainContainer>
    </ModalStyle>
  );
};
