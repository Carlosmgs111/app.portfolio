import {
  ItemsList,
  NavigateBar,
  Item,
  Link,
  NavbarContainer,
  Button,
} from "./styles";
import { Children, cloneElement, useEffect, useState } from "react";
import { useSwitch } from "../../hooks/useSwitch";

export default function Navigation({ children, banner, className }) {
  useEffect(() => {}, []);

  const [menu, switchMenu] = useSwitch(
    { show: false, name: "fas fa-bars p-2 item" },
    { show: true, name: "fas fa-times p-2 item" }
  );
  const [current, setCurrent] = useState(null);

  const childrens = Children.toArray(children);

  return (
    <NavbarContainer className={`${className}`}>
      <NavigateBar className={className}>
        {banner && (
          <Link
            onClick={() => {
              if (menu.show) switchMenu();
              setCurrent(null);
            }}
            to={banner.to}
          >
            {banner.title}
          </Link>
        )}
        <Button
          className={`${menu.name}`}
          id="nav-button"
          onClick={switchMenu}
        ></Button>
        <ItemsList className={`${className} navigation-list`} show={menu.show}>
          {children
            ? childrens.map((child, index) => {
                var LinkedItem = child.props.children.props?.link ? Item : Link;
                return (
                  <LinkedItem
                    className={`${className}`}
                    selected={current === index}
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
                    onClick={(e) => {
                      setCurrent(Number(e.target.id));
                      if (menu.show) switchMenu();
                      console.log({ target: e.target.id });
                      child.props.onClick;
                    }}
                    key={index}
                    to={child.props?.to || "#"}
                    id={child.props?.id || index}
                  >
                    {cloneElement(child, { ...child.props, id: index } || {})}
                  </LinkedItem>
                );
              })
            : null}
        </ItemsList>
      </NavigateBar>
    </NavbarContainer>
  );
}
