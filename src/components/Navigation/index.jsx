import { ItemsList, NavigateBar, Item, Link, NavbarContainer } from "./styles";
import { Children, cloneElement, useEffect } from "react";
import Draggable from "react-draggable";

export default function Navigation({ children, banner, className }) {
  useEffect(() => {}, []);
  const childrens = Children.toArray(children);
  return (
    <NavbarContainer className={className}>
      <NavigateBar className={className}>
        {banner && <Link to={banner.to}>{banner.title}</Link>}
        <ItemsList className={className}>
          {children
            ? childrens.map((child, index) => {
                var LinkedItem = child.props.children.props?.link ? Item : Link;
                return (
                  //<Draggable grid={[45, 45]} axis="y">
                  <LinkedItem
                    className={className}
                    position={
                      childrens.length === 1
                        ? "only"
                        : index === 0
                        ? "first"
                        : index === childrens.length - 1
                        ? "last"
                        : "middle"
                    }
                    type="button"
                    onClick={child.props.onClick}
                    key={index}
                    to={child.props?.to || "#"}
                    id={child.props?.id}
                  >
                    {cloneElement(child, { ...child.props } || {})}
                  </LinkedItem>
                  //</Draggable>
                );
              })
            : null}
        </ItemsList>
      </NavigateBar>
    </NavbarContainer>
  );
}
