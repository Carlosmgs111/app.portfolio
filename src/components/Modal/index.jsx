import { Children, cloneElement, useState } from "react";
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
  const isActive = active || Boolean(children) || Boolean(injected);
  return (
    <ModalStyle
      {...{ classname: `${className}`, onClick: onClick, over, isActive }}
    >
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
  );
};

export { ModalContainer };
