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
  setInjected = () => {},
  embedbutton,
  active = false,
  onClick = null,
  over = true,
}) => {
  const isActive = active || Boolean(children) || Boolean(injected);
  return (
    <ModalStyle
      {...{
        classname: `${className}`,
        onClick: (e) => {
          if (e.target.id === "modal_body") setInjected(null);
        },
        over,
        isActive,
        id: "modal_body",
      }}
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
