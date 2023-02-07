import {
  ItemsList,
  NavigateBar,
  Item,
  Link,
  NavbarContainer,
  Button,
  Banner,
  NavbarHeader,
} from "./styles";
import { Children, cloneElement, useEffect, useState } from "react";
import { useSwitch } from "../../hooks/useSwitch";

export default function Navigation({ children, banner, className }) {
  const [menu, switchMenu] = useSwitch(
    { show: false, name: "fas fa-bars p-2 item" },
    { show: true, name: "fas fa-times p-2 item" }
  );
  const [current, setCurrent] = useState(null);
  const [showfixed, setShowFixed] = useState(false);

  useEffect(() => {
    const onScroll = (e) => {
      const newShowFixed = window.scrollY > 200;
      showfixed !== newShowFixed && setShowFixed(newShowFixed);
    };
    document.addEventListener("scroll", onScroll);
  }, [showfixed]);

  const onClick = (e) => {
    setCurrent(Number(e.target.id));
    if (menu.show) switchMenu();
    console.log({ target: e.target.id });
    child.props.onClick;
  };

  const childrens = Children.toArray(children);

  return (
    <NavbarContainer className={`${className}`}>
      <NavigateBar className={className}>
        <NavbarHeader
          style={{
            justifyContent: "space-between",
            display: "flex",
            flexDirection: "row",
          }}
        >
          {banner && (
            <Banner
              onClick={() => {
                if (menu.show) switchMenu();
                setCurrent(null);
              }}
              to={banner.to}
            >
              {banner.title}
            </Banner>
          )}
          <Button
            className={`${menu.name}`}
            id="nav-button"
            onClick={switchMenu}
          ></Button>
        </NavbarHeader>
        <ItemsList
          showfixed={showfixed}
          className={`${className} navigation-list`}
          show={menu.show}
        >
          {children
            ? childrens.map((child, index) => {
                var LinkedItem = child.props.children.props?.link ? Item : Link;
                return (
                  <LinkedItem
                    className={`${className}`}
                    selected={
                      current === child.props.id || current === String(index)
                    }
                    type="button"
                    onClick={(e) => {
                      const next = e.target.id || child.props.id;
                      if (next) setCurrent(next);
                      if (child.props.onClick) child.props.onClick(e);
                      if (menu.show) switchMenu();
                    }}
                    key={index}
                    to={child.props?.to || ""}
                    id={child.props?.id || index}
                  >
                    {cloneElement(
                      child,
                      { ...child.props, id: child.props?.id || index } || {}
                    )}
                  </LinkedItem>
                );
              })
            : null}
        </ItemsList>
      </NavigateBar>
    </NavbarContainer>
  );
}
