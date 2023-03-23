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
  embedbutton,
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
          embedbutton: child?.props?.embedbutton && (
            <EmbedButton>{child.props.embedbutton}</EmbedButton>
          ),
          disabled: true,
        })
      )}
      {embedbutton && <NativeEmbedButton>{embedbutton}</NativeEmbedButton>}
    </ModalStyle>
  );
};

export { ModalContainer };
