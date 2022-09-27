import { Children, cloneElement } from "react";
import { ModalStyle, EmbedButton,NativeEmbedButton, ModalContainer } from "./styles";

export const Modal = ({
  children,
  className,
  injected,
  embedButton,
  active = false,
  onClick,
}) => {
  return active || children || injected ? (
    <ModalStyle className={`${className}`} onClick={onClick || null}>
      {children
        ? Children.toArray(children).map((child) =>
            cloneElement(child, {
              embedButton: child?.props?.embedButton ? (
                <EmbedButton>{child.props.embedButton}</EmbedButton>
              ) : null,
              disabled: true,
            })
          )
        : injected}
      {embedButton ? <NativeEmbedButton>{embedButton}</NativeEmbedButton> : null}
    </ModalStyle>
  ) : null;
};

export { ModalContainer };
