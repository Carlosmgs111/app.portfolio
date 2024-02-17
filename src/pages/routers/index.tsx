import { Route, Link } from "react-router-dom";
import { beutifyLabel } from "../../utils";
import { NotFound } from "../NotFound";
import styles from "./styles.module.css";

export const NavigationItemsFactory = ({ pages = [], login }: any) => {
  const navigationItems = [];
  for (var page of pages) {
    if (page instanceof Object) {
      const { path, item = <></>, label }: any = page;
      const content = label ? beutifyLabel(label) : item;
      navigationItems.push(
        <Link
          id={item.props.id}
          key={path}
          className={`item ${styles.link}`}
          to={`/${path}`}
        >
          {content}
        </Link>
      );
    }
    if (typeof page === "string") {
      const label = page.slice(page.indexOf("/") + 1);
      navigationItems.push(
        <Link key={page} className={`item ${styles.link}`} to={`/${page}`}>
          {beutifyLabel(label)}
        </Link>
      );
    }
  }
  if (login && !login?.hidden)
    navigationItems.push(
      <Link
        className={`item login ${styles.link}`}
        to=""
        onClick={login?.onClick}
      >
        {login?.label()}
      </Link>
    );
  return navigationItems;
};

export const RoutesFactory = ({
  element,
  root,
  parameters,
  subDomains,
}: any) => {
  const routes = [];
  if (parameters)
    for (var parameter of parameters) {
      routes.push(
        <Route
          key={parameter}
          path={`/${root}/?${parameter}:${parameter}`}
          element={element}
        ></Route>
      );
    }
  if (subDomains)
    for (var subDomain of subDomains) {
      routes.push(
        <Route
          key={subDomain}
          path={`/${root}/${subDomain}`}
          element={element}
        ></Route>
      );
    }
  routes.push(
    <Route key="root" path={`/${root}`} element={element}></Route>,
    <Route key="not-found" path="*" element={<NotFound />}></Route>
  );
  return routes;
};
