import styles from "./styles.module.css";
import { GitHubSVG } from "./GitHubSVG";
import { LinkedInSVG } from "./LinkedInSVG";
import { JestSVG } from "./JestSVG";
import { ReactSVG } from "./ReactSVG";
import { StyledComponentsSVG } from "./StyledComponentsSVG";
import { NextjsSVG } from "./NextjsSVG";
import { ReactRouterSVG } from "./ReactRouterSVG";
import { WebpackSVG } from "./WebpackSVG";
import { AxiosSVG } from "./AxiosSVG";

const SVGContainer = ({ children }: any) => {
  return <div className={styles.svg_container}>{children}</div>;
};

export {
  SVGContainer,
  GitHubSVG,
  LinkedInSVG,
  JestSVG,
  ReactSVG,
  StyledComponentsSVG,
  NextjsSVG,
  ReactRouterSVG,
  WebpackSVG,
  AxiosSVG,
};