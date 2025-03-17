import styles from "./styles.module.css";
import { InfiniteCarousel } from "../../components/InfiniteCarousel";
import {
  ReactSVG,
  JestSVG,
  StyledComponentsSVG,
  NextjsSVG,
  ReactRouterSVG,
  WebpackSVG,
  AxiosSVG,
  SocketioSVG,
  ApolloGraphqlSVG,
  GraphqlSVG,
  TypeScriptSVG,
  JavaScriptSVG,
  PythonSVG,
  NodejsSVG,
  MongodbSVG,
  PostgresSqlSVG,
  ExpressSVG,
  SequelizeSVG,
  MongooseSVG,
  DjangoSVG,
  RabbitmqSVG,
  FastApiSVG,
  DotEnvSVG,
  VSCodeSVG,
  TerminalSVG,
  GitSVG,
  HTMLSVG,
  CSSSVG,
} from "./../../icons";

const TechSkill = ({ children, label }: any) => (
  <div className={styles.skill_container}>
    <span className={styles.skill_label}>{label.replace("SVG", "")}</span>
    <div className={styles.skill_icon}>{children}</div>
  </div>
);

export const TechSkills = () => {
  const firstSlides = Object.entries({
    JestSVG,
    ReactSVG,
    StyledComponentsSVG,
    NextjsSVG,
    ReactRouterSVG,
    WebpackSVG,
    AxiosSVG,
    SocketioSVG,
    ApolloGraphqlSVG,
    GraphqlSVG,
    TypeScriptSVG,
    JavaScriptSVG,
    PythonSVG,
    NodejsSVG,
  }).map(([label, Icon]: any, index: any) => (
    <TechSkill label={label} key={index}>
      {<Icon />}
    </TechSkill>
  ));
  const secondSlides = Object.entries({
    MongodbSVG,
    PostgresSqlSVG,
    ExpressSVG,
    SequelizeSVG,
    MongooseSVG,
    CSSSVG,
    HTMLSVG,
    DjangoSVG,
    RabbitmqSVG,
    FastApiSVG,
    DotEnvSVG,
    VSCodeSVG,
    TerminalSVG,
    GitSVG,
  }).map(([label, Icon]: any, index: any) => (
    <TechSkill label={label} key={index}>
      {<Icon />}
    </TechSkill>
  ));
  return (
    <div className={styles.skills}>
      <InfiniteCarousel gap={"8px"} timing={20} toRight={true}>
        {firstSlides}
      </InfiniteCarousel>
      <InfiniteCarousel gap={"8px"} timing={20}>
        {secondSlides}
      </InfiniteCarousel>
    </div>
  );
};
