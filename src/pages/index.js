import { Route } from "react-router-dom";
import { beutifyLabel } from "../utils";
import { NotFound } from "./NotFound";

export const NavigationItemsFactory = ({ pages = [], login }) => {
  const navigationItems = [];
  for (var page of pages) {
    if (page instanceof Object) {
      const { path, item = <></>, label } = page;
      const content = label ? beutifyLabel(label) : item;
      navigationItems.push(
        <p id={item.props.id} key={path} className="item" to={`/${path}`}>
          {content}
        </p>
      );
    }
    if (typeof page === "string") {
      const label = page.slice(page.indexOf("/") + 1);
      navigationItems.push(
        <p key={page} className="item" to={`/${page}`}>
          {beutifyLabel(label)}
        </p>
      );
    }
  }
  if (login && !login?.hidden)
    navigationItems.push(
      <p className="item" to="#" onClick={login?.onClick}>
        {login?.label()}
      </p>
    );
  return navigationItems;
};

export const RoutesFactory = ({ element, root, parameters, subDomains }) => {
  const routes = [];
  if (parameters)
    for (var parameter of parameters) {
      routes.push(
        <Route
          key={parameter}
          path={`/${root}/?${parameter}:${parameter}`}
          element={element}
          exact
        ></Route>
      );
    }
  if (subDomains)
    for (var subDomain of subDomains) {
      routes.push(
        <Route
          key={subDomain}
          path={`/${root}/${subDomain}`}
          exact
          element={element}
        ></Route>
      );
    }
  routes.push(
    <Route key="root" path={`/${root}`} exact element={element}></Route>,
    <Route key="not-found" path="*" element={<NotFound />}></Route>
  );
  return routes;
};
