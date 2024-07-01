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

const TechSkill = ({ children }: any) => (
  <div className={styles.skill_container}>
    <span className={styles.skill_label}>
      {children.type.name.replace("SVG", "")}
    </span>
    <div className={styles.skill_icon}>{children}</div>
  </div>
);

export const TechSkills = () => {
  const firstSlides = [
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
  ].map<any>((Icon, index) => (
    <TechSkill key={index}>
      <Icon />
    </TechSkill>
  ));
  const secondSlides = [
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
  ].map<any>((Icon, index) => (
    <TechSkill key={index}>
      <Icon />
    </TechSkill>
  ));
  return (
    <div className={styles.skills}>
      <InfiniteCarousel timing={20} toRight={true}>
        {firstSlides}
      </InfiniteCarousel>
      <InfiniteCarousel timing={20}>{secondSlides}</InfiniteCarousel>
    </div>
  );
};
