import { Children, cloneElement } from "react";
import {
  ModalStyle,
  EmbedButton,
  NativeEmbedButton,
  ModalContainer,
} from "./styles";

export const Modal = ({
  children,
  className,
  injected,
  embedButton,
  active = false,
  onClick = null,
  over = true,
}) => {
  return (
    active ||
    children ||
    (injected && (
      <ModalStyle {...{ classname: `${className}`, onClick: onClick, over }}>
        {Children.toArray(children || injected).map((child) =>
          cloneElement(child, {
            ...child.props,
            embedButton: child?.props?.embedButton && (
              <EmbedButton>{child.props.embedButton}</EmbedButton>
            ),
            disabled: true,
          })
        )}
        {embedButton && <NativeEmbedButton>{embedButton}</NativeEmbedButton>}
      </ModalStyle>
    ))
  );
};

export { ModalContainer };
