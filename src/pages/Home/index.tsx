import styles from "./styles.module.css";
import { CodeSnap } from "../../components/CodeSnap";
import { Typing } from "../../components/Typing";
import { GitHubSVG, LinkedInSVG } from "../../icons";
import { Slider } from "../../components/Slider";
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
  PassportSVG,
  JsonWebTokensSVG,
  DjangoSVG,
  RabbitmqSVG,
  FastApiSVG,
  DotEnvSVG,
  VSCodeSVG,
  TerminalSVG,
  GitSVG,
} from "./../../icons";

export function Home() {
  const literalCodeSnapshot = `
1 | class Developer {
2 |   name: string = "";
3 |   lastName: string = "";
4 |
5 |   constructor(name: string, lastName: string) {
6 |     this.name = name;
7 |     this.lastName = lastName;
8 |   };
9 |
10|   presentYourSelf(): string {
11|     return \`
12|     Hi! I'm \${this.name} \${this.lastName}
13|     <{*Typing*}>
14|     and make solutions is my passion
15|     💪💖🦄
15|     \`;
16|   };
17| };
18|
19| const Carlos = new Developer("Carlos", "Muñoz");
20| console.log(Carlos.presentYourSelf())
  `;
  const mySkills = [
    { content: "React", color: "#61DAFB" },
    {
      content: "Node.js",
      color: "#339933",
    },
    { content: "HTML5", color: "#E34F26" },
    {
      content: "Python",
      color: "#3776ab",
    },
    { content: "PostgreSQL", color: "#4169E1" },
    { content: "Socket.io", color: "#010101" },
    { content: "CSS3", color: "#1572B6" },
    {
      content: "Javascript",
      color: "#f7df1e",
    },
    { content: "MongoDB", color: "#47A248" },
    { content: "GraphQL", color: "#E10098" },
    {
      content: "Typescript",
      color: "#3178c6",
    },
  ];
  const myStacks = [
    {
      content: "Backend",
      color: "#339933",
    },
    {
      content: "Frontend",
      color: "#61dafb",
    },
    {
      content: "Fullstack",
      color: "#e0234e",
    },
  ];
  const wordsInCode = [
    {
      content: "Backend",
      color: "#339933",
    },
    {
      content: "Frontend",
      color: "#61dafb",
    },
    {
      content: "Fullstack",
      color: "#e0234e",
    },
    {
      content: "Python",
      color: "#3776ab",
    },
    {
      content: "Javascript",
      color: "#f7df1e",
    },
    {
      content: "Typescript",
      color: "#3178c6",
    },
  ];
  const firstSlides = [
    <JestSVG />,
    <ReactSVG />,
    <StyledComponentsSVG />,
    <NextjsSVG />,
    <ReactRouterSVG />,
    <WebpackSVG />,
    <AxiosSVG />,
  ];
  const secondSlides = [
    <SocketioSVG />,
    <ApolloGraphqlSVG />,
    <GraphqlSVG />,
    <TypeScriptSVG />,
    <JavaScriptSVG />,
    <PythonSVG />,
    <NodejsSVG />,
  ];
  const thirdSlides = [
    <MongodbSVG />,
    <PostgresSqlSVG />,
    <ExpressSVG />,
    <SequelizeSVG />,
    <MongooseSVG />,
    <PassportSVG />,
    <JsonWebTokensSVG />,
  ];
  const fourthSlides = [
    <DjangoSVG />,
    <RabbitmqSVG />,
    <FastApiSVG />,
    <DotEnvSVG />,
    <VSCodeSVG />,
    <TerminalSVG />,
    <GitSVG />,
  ];
  return (
    <div className={styles.container}>
      <article className={styles.section.concat(" ", styles.hero)}>
        <div className={`${styles.hero_background} `}>
          <Slider toRight={true}>{firstSlides}</Slider>
          <Slider>{secondSlides}</Slider>
          <Slider toRight={true}>{thirdSlides}</Slider>
          <Slider>{fourthSlides}</Slider>
        </div>
        <section className={styles.presentation_section}>
          <div className={styles.presentation}>
            <h1>
              Hola, soy <br />
              <b>Carlos Muñoz</b>,
            </h1>
            <h2>
              Desarrollador
              <Typing
                baseTiming={4.8}
                words={myStacks}
                fontSize={"3.2rem"}
              ></Typing>
            </h2>
            <br />
            <h2>Creo Soluciones </h2>
            <br />
            <h2>
              Usando
              <Typing
                baseTiming={2.8}
                words={mySkills}
                fontSize={"3.2rem"}
              ></Typing>
            </h2>
          </div>
          <div className={styles.contact}>
            <a
              className={styles.contact_icon}
              href="https://github.com/Carlosmgs111"
              target="_blank"
            >
              <GitHubSVG></GitHubSVG>
            </a>
            <a
              className={styles.contact_icon}
              href="https://www.linkedin.com/in/cmgs111/"
              target="_blank"
            >
              <LinkedInSVG></LinkedInSVG>
            </a>
          </div>
        </section>
      </article>
      <article className={styles.section}>
        <section className={styles.coding_section}>
          <CodeSnap fontSize={"1.4rem"} words={wordsInCode}>
            {literalCodeSnapshot.replaceAll("|", " ")}
          </CodeSnap>
          <div className={styles.console}>
            <span>{" > "}</span>
            <div className={styles.output}>
              <span>Hi! I'm Carlos Muñoz</span>
              <Typing
                words={wordsInCode}
                text={"Developer"}
                cursor={false}
                fontSize={"1.6rem"}
              />
              <span>and make solutions is my passion</span>
              <br />
              <span>💪💖🦄</span>
            </div>
          </div>
        </section>
      </article>
      <article className={styles.section}>
        <p className={styles.text}>
          Anim ex nostrud exercitation exercitation anim aliqua. Sit Lorem id
          laborum proident eu ad Lorem culpa. Occaecat ipsum exercitation
          consequat aute ullamco. Commodo enim voluptate aliqua pariatur ipsum
          tempor enim velit nisi. Officia ut adipisicing veniam enim esse aliqua
          minim Lorem esse amet ut elit ullamco et. Id reprehenderit cillum
          mollit qui esse. Do sint dolor sunt adipisicing est eu tempor proident
          sunt commodo ipsum occaecat tempor incididunt. Dolore consectetur
          nostrud sunt aliquip eiusmod velit. Irure mollit duis sint dolore.
          Aliqua quis amet est minim occaecat ipsum laboris do laboris minim
          nostrud anim. Qui adipisicing velit cupidatat adipisicing Lorem.
          Aliquip duis elit deserunt ad. Aute id ut tempor duis dolor anim.
        </p>
      </article>
    </div>
  );
}
