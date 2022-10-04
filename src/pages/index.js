import { Route } from "react-router-dom";
import { beutifyLabel } from "../utils";
import { NotFound } from "./NotFound";

export const NavigationItemsFactory = ({ pages, login }) => {
  const navigationItems = [];
  for (var page of pages) {
    const label = page.slice(page.indexOf("/") + 1);
    navigationItems.push(
      <p key={page} className="item" to={`/${page}`}>
        {beutifyLabel(label)}
      </p>
    );
  }
  if (login)
    navigationItems.push(
      <p className="item" to="#" onClick={login.onClick}>
        {login.label()}
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
    <Route path={`/${root}`} exact element={element}></Route>,
    <Route path="*" element={<NotFound />}></Route>
  );
  return routes;
};